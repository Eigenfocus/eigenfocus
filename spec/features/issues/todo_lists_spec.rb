require 'rails_helper'

describe "Issue Todo Lists" do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project) }
  let!(:issue) { FactoryBot.create(:issue, project: project) }

  def open_issue_detail
    visit project_issues_path(project)
    within dom_id(issue) do
      find(".cpy-edit-button").click
    end
  end

  specify "I can add a todo list" do
    open_issue_detail

    click_button "Add list"

    within "#issue_todo_lists" do
      expect(page).to have_content("To-do list")
    end
    expect(issue.todo_lists.count).to eq(1)
  end

  specify "I can rename a todo list" do
    todo_list = FactoryBot.create(:issue_todo_list, issue: issue, title: "Old name")
    open_issue_detail

    within dom_id(todo_list) do
      find(".cpy-todo-list-title").click
      find(".cpy-todo-list-title-input").set("New name")
    end
    find("body").click

    within dom_id(todo_list) do
      expect(page).to have_content("New name")
    end
    expect(todo_list.reload.title).to eq("New name")
  end

  specify "I can delete a todo list" do
    todo_list = FactoryBot.create(:issue_todo_list, issue: issue, title: "Throwaway")
    open_issue_detail

    within dom_id(todo_list) do
      accept_confirm do
        find(".cpy-delete-todo-list").click
      end
    end

    expect(page).not_to have_content("Throwaway")
    expect(Issue::TodoList.exists?(todo_list.id)).to be(false)
  end
end
