require 'rails_helper'

describe "Issues - Mark as finished" do
  let!(:user) { create(:user) }
  let!(:project) { create(:project) }
  let!(:column) { create(:grouping, visualization: project.default_visualization) }

  before(:each) do
    column.allocate_issue(issue)
  end

  context 'When issue is not finished yet' do
    let!(:issue) { create(:issue, :unfinished, project:) }

    specify "I can mark issue as finished directly on board view" do
      visit visualization_path(project.default_visualization)

      expect(page).to have_content(issue.title)

      find(dom_id(issue)).hover

      within dom_id(issue) do
        find(".cpy-finish-check-toogle").click
      end

      expect(page).to have_css(".cpy-finish-check-toogle.finished")
      expect(issue.reload).to be_finished
    end
  end

  context 'When issue is not finished yet' do
    let!(:issue) { create(:issue, :finished, project:) }

    specify "I can mark issue as unfinished directly on board view" do
      visit visualization_path(project.default_visualization)

      expect(page).to have_content(issue.title)

      within dom_id(issue) do
        find(".cpy-finish-check-toogle").click
      end

      expect(page).to_not have_css(".cpy-finish-check-toogle.finished")
      expect(issue.reload).to_not be_finished
    end
  end
end
