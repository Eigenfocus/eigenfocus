require 'rails_helper'

describe "Issue Checklists" do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project) }
  let!(:issue) { FactoryBot.create(:issue, project: project) }

  def open_issue_detail
    visit project_issues_path(project)
    within dom_id(issue) do
      find(".cpy-edit-button").click
    end
  end

  specify "I can add a checklist" do
    open_issue_detail

    click_button "Add checklist"

    within "#issue_checklists" do
      expect(page).to have_content("Checklist")
    end
    expect(issue.checklists.count).to eq(1)
  end

  specify "I can rename a checklist" do
    checklist = FactoryBot.create(:issue_checklist, issue: issue, title: "Old name")
    open_issue_detail

    within dom_id(checklist) do
      find(".cpy-checklist-title").click
      find(".cpy-checklist-title-input").set("New name")
      find(".cpy-save-checklist").click

      expect(page).to have_content("New name")
    end
    expect(checklist.reload.title).to eq("New name")
  end

  specify "I can cancel renaming a checklist with the back button" do
    checklist = FactoryBot.create(:issue_checklist, issue: issue, title: "Keep me")
    open_issue_detail

    within dom_id(checklist) do
      find(".cpy-checklist-title").click
      find(".cpy-checklist-title-input").set("Discarded name")
      find(".cpy-close-checklist").click

      expect(page).to have_content("Keep me")
      expect(page).to have_no_css(".cpy-checklist-title-input")
    end
    expect(checklist.reload.title).to eq("Keep me")
  end

  specify "I can delete a checklist" do
    checklist = FactoryBot.create(:issue_checklist, issue: issue, title: "Throwaway")
    open_issue_detail

    within dom_id(checklist) do
      find(".cpy-checklist").hover
      accept_confirm do
        find(".cpy-delete-checklist", visible: :visible).click
      end
    end

    expect(page).not_to have_content("Throwaway")
    expect(Issue::Checklist.exists?(checklist.id)).to be(false)
  end
end
