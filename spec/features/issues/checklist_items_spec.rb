require 'rails_helper'

describe "Issue Checklist Items" do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project) }
  let!(:issue) { FactoryBot.create(:issue, project: project) }
  let!(:checklist) { FactoryBot.create(:issue_checklist, issue: issue, title: "My checklist") }

  def open_issue_detail
    visit project_issues_path(project)
    within dom_id(issue) do
      find(".cpy-edit-button").click
    end
  end

  specify "I can add a checklist item" do
    open_issue_detail

    within dom_id(checklist) do
      click_button "Add item"
      find(".cpy-checklist-item-input").set("Buy milk")
      find(".cpy-save-checklist-item").click
    end

    within dom_id(checklist) do
      expect(page).to have_content("Buy milk")
    end
    expect(checklist.reload.items.pluck(:description)).to include("Buy milk")
  end

  specify "saving an empty item discards it" do
    open_issue_detail

    within dom_id(checklist) do
      click_button "Add item"
      find(".cpy-save-checklist-item").click
    end

    expect(page).to have_no_css(".cpy-checklist-item-input")
    expect(checklist.reload.items.count).to eq(0)
  end

  specify "closing a new item discards it" do
    open_issue_detail

    within dom_id(checklist) do
      click_button "Add item"
      find(".cpy-checklist-item-input").set("changed my mind")
      find(".cpy-close-checklist-item").click
    end

    expect(page).to have_no_css(".cpy-checklist-item-input")
    expect(checklist.reload.items.count).to eq(0)
  end

  specify "pressing Enter keeps adding new items" do
    open_issue_detail

    within dom_id(checklist) do
      click_button "Add item"

      find(".cpy-checklist-item-input").set("First")
      find(".cpy-checklist-item-input").send_keys(:enter)
      expect(page).to have_content("First")

      find(".cpy-checklist-item-input").set("Second")
      find(".cpy-checklist-item-input").send_keys(:enter)
      expect(page).to have_content("Second")

      find(".cpy-checklist-item-input").send_keys(:escape)
      expect(page).to have_no_css(".cpy-checklist-item-input")
    end

    expect(checklist.reload.items.order(:created_at).pluck(:description)).to eq(%w[First Second])
  end

  specify "pressing Esc exits edit mode without closing the modal" do
    item = FactoryBot.create(:issue_checklist_item, checklist: checklist, description: "Original")
    open_issue_detail

    within dom_id(item) do
      find(".cpy-checklist-item-text").click
      field = find(".cpy-checklist-item-input")
      field.set("Changed text")
      field.send_keys(:escape)
    end

    within dom_id(item) do
      expect(page).to have_content("Original")
      expect(page).to have_no_css(".cpy-checklist-item-input")
    end
    expect(page).to have_content("My checklist")
    expect(item.reload.description).to eq("Original")
  end

  specify "I can check an item, recording who finished it" do
    item = FactoryBot.create(:issue_checklist_item, checklist: checklist, description: "Do the thing")
    open_issue_detail

    within dom_id(item) do
      find("input[type=checkbox]").click
    end

    expect(page).to have_css("#{dom_id(item)} input[type=checkbox]:checked")
    item.reload
    expect(item.finished?).to be(true)
    expect(item.finished_by).to eq(user)
  end

  specify "I can uncheck a finished item" do
    item = FactoryBot.create(:issue_checklist_item, :finished, checklist: checklist, finished_by: user, description: "Already done")
    open_issue_detail

    within dom_id(item) do
      find("input[type=checkbox]").click
    end

    expect(page).to have_css("#{dom_id(item)} input[type=checkbox]:not(:checked)")
    expect(item.reload.finished?).to be(false)
  end

  specify "I can delete an item" do
    item = FactoryBot.create(:issue_checklist_item, checklist: checklist, description: "Remove me")
    open_issue_detail

    within dom_id(item) do
      find(".cpy-checklist-item").hover
      find(".cpy-delete-checklist-item", visible: :visible).click
    end

    expect(page).not_to have_content("Remove me")
    expect(Issue::ChecklistItem.exists?(item.id)).to be(false)
  end

  specify "I can reorder items within a checklist by dragging" do
    %w[A B C].each do |description|
      FactoryBot.create(:issue_checklist_item, checklist: checklist, description: description)
    end
    open_issue_detail

    within dom_id(checklist) do
      find(".cpy-checklist-item", match: :first)
      first_item = all(".cpy-checklist-item")[0]
      third_item = all(".cpy-checklist-item")[2]

      first_item.drag_to(third_item)
    end

    wait_until { checklist.reload.items.order(:position).pluck(:description) == %w[B C A] }
    expect(checklist.items.order(:position).pluck(:description)).to eq(%w[B C A])
  end

  specify "I can edit an item from the pencil button" do
    item = FactoryBot.create(:issue_checklist_item, checklist: checklist, description: "Edit me")
    open_issue_detail

    within dom_id(item) do
      find(".cpy-checklist-item").hover
      find(".cpy-edit-checklist-item", visible: :visible).click
      find(".cpy-checklist-item-input").set("Edited")
      find(".cpy-save-checklist-item").click
      expect(page).to have_content("Edited")
    end
    expect(item.reload.description).to eq("Edited")
  end
end
