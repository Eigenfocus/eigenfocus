require 'rails_helper'

describe "Issue Todos" do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project) }
  let!(:issue) { FactoryBot.create(:issue, project: project) }
  let!(:todo_list) { FactoryBot.create(:issue_todo_list, issue: issue, title: "My list") }

  def open_issue_detail
    visit project_issues_path(project)
    within dom_id(issue) do
      find(".cpy-edit-button").click
    end
  end

  specify "I can add a todo item" do
    open_issue_detail

    within dom_id(todo_list) do
      click_button "Add item"
      find(".cpy-todo-description-input").set("Buy milk")
    end
    find("body").click

    within dom_id(todo_list) do
      expect(page).to have_content("Buy milk")
    end
    expect(todo_list.reload.todos.pluck(:description)).to include("Buy milk")
  end

  specify "an emptied new todo is discarded on blur" do
    open_issue_detail

    within dom_id(todo_list) do
      click_button "Add item"
      find(".cpy-todo-description-input").set("")
    end
    find("body").click

    expect(page).to have_no_css(".cpy-todo-description-input")
    expect(todo_list.reload.todos.count).to eq(0)
  end

  specify "I can check a todo, recording who finished it" do
    todo = FactoryBot.create(:issue_todo, todo_list: todo_list, description: "Do the thing")
    open_issue_detail

    within dom_id(todo) do
      find("input[type=checkbox]").click
    end

    expect(page).to have_css("#{dom_id(todo)} input[type=checkbox]:checked")
    todo.reload
    expect(todo.finished?).to be(true)
    expect(todo.finished_by).to eq(user)
  end

  specify "I can uncheck a finished todo" do
    todo = FactoryBot.create(:issue_todo, :finished, todo_list: todo_list, finished_by: user, description: "Already done")
    open_issue_detail

    within dom_id(todo) do
      find("input[type=checkbox]").click
    end

    expect(page).to have_css("#{dom_id(todo)} input[type=checkbox]:not(:checked)")
    expect(todo.reload.finished?).to be(false)
  end

  specify "I can delete a todo" do
    todo = FactoryBot.create(:issue_todo, todo_list: todo_list, description: "Remove me")
    open_issue_detail

    within dom_id(todo) do
      find(".cpy-delete-todo").click
    end

    expect(page).not_to have_content("Remove me")
    expect(Issue::Todo.exists?(todo.id)).to be(false)
  end
end
