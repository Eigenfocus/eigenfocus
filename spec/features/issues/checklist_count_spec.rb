require 'rails_helper'

describe "Issue Checklist count and strike-through" do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project) }
  let!(:issue) { FactoryBot.create(:issue, project: project) }
  let!(:checklist) { FactoryBot.create(:issue_checklist, issue: issue, title: "My checklist") }
  let!(:item_a) { FactoryBot.create(:issue_checklist_item, checklist: checklist, description: "First") }
  let!(:item_b) { FactoryBot.create(:issue_checklist_item, checklist: checklist, description: "Second") }

  def open_issue_detail
    visit project_issues_path(project)
    within dom_id(issue) do
      find(".cpy-edit-button").click
    end
  end

  specify "the count reflects checked items and the title strikes when all are done" do
    open_issue_detail

    within dom_id(checklist) do
      expect(page).to have_css("[data-issue--checklist-target='count']", text: "0/2")

      within dom_id(item_a) do
        find("input[type=checkbox]").click
      end
      expect(page).to have_css("[data-issue--checklist-target='count']", text: "1/2")

      within dom_id(item_b) do
        find("input[type=checkbox]").click
      end
      expect(page).to have_css("[data-issue--checklist-target='count']", text: "2/2")
      expect(page).to have_css(".cpy-checklist-title.line-through")
    end
  end
end
