require 'rails_helper'

describe "Issues - Mark as finished" do
  let!(:user) { create(:user) }
  let!(:project) { create(:project) }

  context 'When issue is not finished yet' do
    let!(:issue) { create(:issue, :unfinished, project:) }

    specify "I can mark issue as finished directly on board view" do
      visit project_show_issue_path(project, issue)

      expect(page).to have_content(issue.title)

      find(".cpy-finish-check-toogle").click

      expect(page).to have_content("Issue was successfully marked as finished.")
      expect(issue.reload).to be_finished
    end
  end

  context 'When issue is not finished yet' do
    let!(:issue) { create(:issue, :finished, project:) }

    specify "I can mark issue as unfinished directly on board view" do
      visit project_show_issue_path(project, issue)

      find(".cpy-finish-check-toogle").click

      expect(page).to have_content("Issue was successfully unmarked as finished.")
      expect(issue.reload).to_not be_finished
    end
  end
end
