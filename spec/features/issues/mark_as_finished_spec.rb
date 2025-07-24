require 'rails_helper'

describe "Issues - Mark as finished" do
  let!(:user) { create(:user) }
  let!(:project) { create(:project) }

  around do |example|
    Timecop.freeze(Time.zone.local(2025, 6, 16, 10, 0, 0)) do
      example.run
    end
  end

  context 'I can finish an issue' do
    let!(:issue) { create(:issue, :unfinished, project:) }

    specify "from the issue detail page" do
      visit project_show_issue_path(project, issue)

      expect(page).to have_content(issue.title)

      within(".cpy-issue-detail") do
        find(".cpy-finish-check-toggle").click

        expect(page).to have_css(".cpy-finish-check-toggle.finished")

        expect(page).to have_css(".fa-check")
      end

      within(".cpy-issue-detail [data-issue-finished-at]") do
        expect(page).to have_content("16, June 2025")
      end

      expect(issue.reload).to be_finished
    end

    specify "from the all issues list" do
      visit project_issues_path(project)

      find("#{dom_id(issue)} .show-issue-finish-toggle-on-hover").hover

      within("#{dom_id(issue)}") do
        find(".cpy-finish-check-toggle").click
        expect(page).to have_css(".cpy-finish-check-toggle.finished")
        expect(page).to have_css(".fa-check")
      end

      expect(issue.reload).to be_finished
    end
  end

  context 'I can unfinish an issue' do
    let!(:issue) { create(:issue, :finished, project:) }

    specify "from the issue detail page" do
      visit project_show_issue_path(project, issue)

      within(".cpy-issue-detail") do
        find(".cpy-finish-check-toggle").click
        expect(page).to_not have_css(".cpy-finish-check-toggle.finished")
        expect(page).to_not have_css(".fa-check")
      end

      expect(find("[data-issue-finished-at]").text).to eq("")
      expect(issue.reload).to_not be_finished
    end

    specify "from the all issues list" do
      visit project_issues_path(project)

      within("#{dom_id(issue)}") do
        find(".cpy-finish-check-toggle").click
        expect(page).to_not have_css(".cpy-finish-check-toggle.finished")
        expect(page).to_not have_css(".fa-check")
      end

      expect(issue.reload).to_not be_finished
    end
  end
end
