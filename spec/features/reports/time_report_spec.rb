require 'rails_helper'

context "As a user, I want to generate time reports" do
  around(:example) do |ex|
    Timecop.freeze("2024-07-13 12:00".to_datetime) do
      ex.run
    end
  end

  let(:user) { FactoryBot.create(:user) }

  let(:project_alpha) { FactoryBot.create(:project, name: 'Alpha') }
  let(:project_beta) { FactoryBot.create(:project, name: 'Beta') }

  before(:each) do
    FactoryBot.create(:time_entry, user:, project: project_alpha, total_logged_time_in_minutes: 10, reference_date: 7.days.ago)
    FactoryBot.create(:time_entry, user:, project: project_alpha, total_logged_time_in_minutes: 15, reference_date: 6.days.ago)

    FactoryBot.create(:time_entry, user:, project: project_beta, total_logged_time_in_minutes: 90, reference_date: 2.days.ago)
    FactoryBot.create(:time_entry, user:, project: project_beta, total_logged_time_in_minutes: 120, reference_date: 1.days.ago)
  end

  specify "I can filter by projects" do
    visit total_time_reports_path

    click_button "Generate report"

    within 'form' do
      select "Alpha", from: "report_project_ids"
      click_button "Generate report"
    end

    within '#report' do
      expect(page).to have_content("0.42 hours")
    end

    within 'form' do
      select "Beta", from: "report_project_ids"
      click_button "Generate report"
    end

    within '#report' do
      expect(page).to have_content("3.92 hours") # alpha + beta
    end

    expect(all("table tbody tr").count).to eq(4)
  end

  specify "I can filter by time period" do
    visit total_time_reports_path

    within 'form' do
      fill_in :report_start_at, with: "2024-07-12" # one day ago
      click_button "Generate report"
    end

    within '#report' do
      expect(page).to have_content("2.0 hours") # alpha + beta
    end

    within 'form' do
      fill_in :report_start_at, with: "2024-07-7" # 6 days ago
      fill_in :report_end_at, with: "2024-07-11" # 2 days ago ago
      page.execute_script("document.getElementById('report_end_at').blur()")
      click_button "Generate report"
    end

    within '#report' do
      expect(page).to have_content("1.75 hours") # alpha + beta
    end
  end
end
