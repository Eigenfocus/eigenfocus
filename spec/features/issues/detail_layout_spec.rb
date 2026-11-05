require "rails_helper"

describe "Issue detail layout", :disabled_in_essential_edition, :disable_in_pro_edition do
  let!(:user) { create(:user) }
  let!(:project) { create(:project) }
  let!(:issue) { create(:issue, project:) }

  specify "fields are in their own column and content in another" do
    visit show_visualization_issue_path(project.default_visualization, issue)

    within ".cpy-issue-detail-fields" do
      expect(page).to have_css(".cpy-issue-labels")
      expect(page).to have_field("issue_due_date", visible: :all)
    end

    within ".cpy-issue-detail-main" do
      expect(page).to have_css(".cpy-issue-dropzone ~ .cpy-comments-container")
    end
  end
end
