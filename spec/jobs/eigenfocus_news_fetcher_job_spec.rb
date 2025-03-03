require 'rails_helper'

RSpec.describe EigenfocusNewsFetcherJob, type: :job do
  let(:app_metadata) { double(AppMetadata, token: "123", current_version: "0.0.1") }
  let(:news_data) do
    [
      {
        "id" => "news-1",
        "title" => "Important Update",
        "content" => "New features released",
        "announcement_modes" => [ "sound", "modal" ],
        "published_at" => Time.current.iso8601
      },
      {
        "id" => "news-2",
        "title" => "System Maintenance",
        "content" => "Scheduled maintenance notice",
        "announcement_modes" => [ "modal" ],
        "published_at" => 1.hour.ago.iso8601
      }
    ]
  end

  before do
    allow(AppMetadata).to receive(:instance).and_return(app_metadata)
    allow(EigenfocusNewsFetcher).to receive(:call).with(app_metadata).and_return(news_data)
  end

  describe '#perform' do
    it 'creates notifications for new news items' do
      expect {
        described_class.perform_now
      }.to change(Notification, :count).by(2)

      first_notification = Notification.find_by(external_id: "news-1")
      expect(first_notification).to have_attributes(
        title: "Important Update",
        content: "New features released",
        announcement_modes: ["sound", "modal"]
      )

      second_notification = Notification.find_by(external_id: "news-2")
      expect(second_notification).to have_attributes(
        title: "System Maintenance",
        content: "Scheduled maintenance notice",
        announcement_modes: ["modal"]
      )
    end

    context 'when some notifications already exist' do
      before do
        create(:notification, external_id: "news-1")
      end

      it 'only creates notifications for new items' do
        expect {
          described_class.perform_now
        }.to change(Notification, :count).by(1)

        new_notification = Notification.last
        expect(new_notification).to have_attributes(
          external_id: "news-2",
          title: "System Maintenance"
        )
      end
    end

    context 'when the fetcher returns empty or invalid data' do
      before do
        allow(EigenfocusNewsFetcher).to receive(:call).with(app_metadata).and_return([])
      end

      it 'handles empty response gracefully' do
        expect {
          described_class.perform_now
        }.not_to change(Notification, :count)
      end
    end

    context 'when the fetcher raises an error' do
      before do
        allow(EigenfocusNewsFetcher).to receive(:call).with(app_metadata).and_raise(StandardError)
      end

      it 'raises the error to be handled by job retry mechanism' do
        expect {
          described_class.perform_now
        }.to raise_error(StandardError)
      end
    end
  end
end
