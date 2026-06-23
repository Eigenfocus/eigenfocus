require 'rails_helper'

describe "Issue Todo count and strike-through" do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project) }
  let!(:issue) { FactoryBot.create(:issue, project: project) }
  let!(:todo_list) { FactoryBot.create(:issue_todo_list, issue: issue, title: "My list") }
  let!(:todo_a) { FactoryBot.create(:issue_todo, todo_list: todo_list, description: "First") }
  let!(:todo_b) { FactoryBot.create(:issue_todo, todo_list: todo_list, description: "Second") }

  def open_issue_detail
    visit project_issues_path(project)
    within dom_id(issue) do
      find(".cpy-edit-button").click
    end
  end

  specify "the count reflects checked todos and the title strikes when all are done" do
    open_issue_detail

    within dom_id(todo_list) do
      expect(page).to have_css("[data-issue--todos-target='count']", text: "0/2")

      within dom_id(todo_a) do
        find("input[type=checkbox]").click
      end
      expect(page).to have_css("[data-issue--todos-target='count']", text: "1/2")

      within dom_id(todo_b) do
        find("input[type=checkbox]").click
      end
      expect(page).to have_css("[data-issue--todos-target='count']", text: "2/2")
      expect(page).to have_css(".cpy-todo-list-title.line-through")
    end
  end
end
