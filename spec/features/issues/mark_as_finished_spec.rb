require 'rails_helper'

describe "Issues - Mark as finished" do
  let!(:user) { create(:user) }
  let!(:project) { create(:project) }

  around do |example|
    Timecop.freeze(Time.zone.local(2025, 6, 16, 10, 0, 0)) do
      example.run
    end
  end

  context 'When issue is not finished yet' do
    let!(:issue) { create(:issue, :unfinished, project:) }

    specify "I can mark issue as finished" do
      visit project_show_issue_path(project, issue)

      expect(page).to have_content(issue.title)

      find(".cpy-finish-check-toogle").click

      expect(page).to have_css(".cpy-finish-check-toogle.finished")

      within("#issue_#{issue.id}") do
        expect(page).to have_css(".fa-check")
      end

      within("[data-issue-finished-at]") do
        expect(page).to have_content("16, June 2025")
      end

      expect(issue.reload).to be_finished
    end
  end

  context 'When issue is not finished yet' do
    let!(:issue) { create(:issue, :finished, project:) }

    specify "I can mark issue as unfinished" do
      visit project_show_issue_path(project, issue)

      find(".cpy-finish-check-toogle").click

      expect(page).to_not have_css(".cpy-finish-check-toogle.finished")
      expect(issue.reload).to_not be_finished

      within("#issue_#{issue.id}") do
        expect(page).to_not have_css(".fa-check")
      end

      expect(find("[data-issue-finished-at]").text).to eq("")
    end
  end
end
