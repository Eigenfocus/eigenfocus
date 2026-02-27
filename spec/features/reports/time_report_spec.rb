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

    select_from_multi_select(selector: '.cpy-projects-select', option_text: "Alpha")
    click_button "Generate report"

    within '#report' do
      expect(page).to have_content("0.42 hours")
    end

    select_from_multi_select(selector: '.cpy-projects-select', option_text: "Beta")
    click_button "Generate report"

    within '#report' do
      expect(page).to have_content("3.92 hours") # alpha + beta
    end

    expect(all("table tbody tr").count).to eq(4)
  end

  specify "I can filter by issue labels" do
    alpha_issue = FactoryBot.create(:issue, title: "Dev-Issue", project: project_alpha)
    label_marketing = project_alpha.issue_labels.create!(title: 'Marketing')
    label_marketing.issues << alpha_issue
    project_alpha.issue_labels.create!(title: 'Development')
    FactoryBot.create(:time_entry, user:, project: project_alpha, issue: alpha_issue, total_logged_time_in_minutes: 30, reference_date: 7.days.ago)

    beta_issue = FactoryBot.create(:issue, title: "Dev-Issue", project: project_beta)
    label_development = project_beta.issue_labels.create!(title: 'Development')
    label_marketing = project_beta.issue_labels.create!(title: 'Marketing')
    label_development.issues << beta_issue
    label_marketing.issues << beta_issue
    FactoryBot.create(:time_entry, user:, project: project_beta, issue: beta_issue, total_logged_time_in_minutes: 30, reference_date: 7.days.ago)


    visit total_time_reports_path


    select_from_multi_select(selector: '.cpy-tags-select', option_text: "Marketing")
    click_button "Generate report"


    within '#report' do
      expect(page).to have_content("1.0 hours")
    end

    visit total_time_reports_path

    select_from_multi_select(selector: '.cpy-tags-select', option_text: "Marketing")
    select_from_multi_select(selector: '.cpy-tags-select', option_text: "Development")
    click_button "Generate report"


    within '#report' do
      expect(page).to have_content("0.5 hours")
    end

    expect(all("table tbody tr").count).to eq(1)
  end

  specify "I can filter by time period" do
    visit total_time_reports_path

    within 'form' do
      fill_in :q_reference_date_gteq, with: "2024-07-12" # one day ago
      click_button "Generate report"
    end

    within '#report' do
      expect(page).to have_content("2.0 hours") # alpha + beta
    end

    within 'form' do
      fill_in :q_reference_date_gteq, with: "2024-07-7" # 6 days ago
      fill_in :q_reference_date_lteq, with: "2024-07-11" # 2 days ago ago
      page.execute_script("document.getElementById('q_reference_date_lteq').blur()")
      click_button "Generate report"
    end

    within '#report' do
      expect(page).to have_content("1.75 hours") # alpha + beta
    end
  end
end
