require 'rails_helper'

describe EigenfocusNotificationsFetcher do
  let(:app_metadata) { double(AppMetadata, token: "123", current_version: "0.0.1", last_used_at: DateTime.current) }
  let(:service) { described_class.new(app_metadata) }

  describe '#call' do
    let(:today) { Date.current.beginning_of_day }

    let(:headers) do
      {
        'App-Token' => app_metadata.token,
        'App-Version' => app_metadata.current_version.to_s
      }
    end

    context 'when there are no existing notifications' do
      before do
        stub_request(:get, /last_fetched_at=#{today.iso8601}/)
          .with(headers: headers)
          .to_return(
            status: 200,
            body: [
              { title: 'News 1', content: 'Content 1', published_at: '2024-02-28T10:00:00Z' }
            ].to_json
          )
      end

      it 'fetches news with beginning of today as last_fetched_at' do
        response = service.call
        expect(response).to be_an(Array)
        expect(response.first['title']).to eq('News 1')
      end
    end

    context 'when there are existing notifications' do
      let!(:last_notification) { create(:notification, published_at: 1.day.ago) }

      before do
        stub_request(:get, /last_fetched_at=#{last_notification.published_at.iso8601}/)
          .with(headers: headers)
          .to_return(
            status: 200,
            body: [
              { title: 'News 2', content: 'Content 2', published_at: Time.current.iso8601 }
            ].to_json
          )
      end

      it 'fetches news with last notification published_at as last_fetched_at' do
        response = service.call
        expect(response).to be_an(Array)
        expect(response.first['title']).to eq('News 2')
      end
    end
  end
end
