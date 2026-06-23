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
      find(".cpy-save-todo").click
    end

    within dom_id(todo_list) do
      expect(page).to have_content("Buy milk")
    end
    expect(todo_list.reload.todos.pluck(:description)).to include("Buy milk")
  end

  specify "saving an empty todo discards it" do
    open_issue_detail

    within dom_id(todo_list) do
      click_button "Add item"
      find(".cpy-save-todo").click
    end

    expect(page).to have_no_css(".cpy-todo-description-input")
    expect(todo_list.reload.todos.count).to eq(0)
  end

  specify "closing a new todo discards it" do
    open_issue_detail

    within dom_id(todo_list) do
      click_button "Add item"
      find(".cpy-todo-description-input").set("changed my mind")
      find(".cpy-close-todo").click
    end

    expect(page).to have_no_css(".cpy-todo-description-input")
    expect(todo_list.reload.todos.count).to eq(0)
  end

  specify "pressing Enter keeps adding new todos" do
    open_issue_detail

    within dom_id(todo_list) do
      click_button "Add item"

      find(".cpy-todo-description-input").set("First")
      find(".cpy-todo-description-input").send_keys(:enter)
      expect(page).to have_content("First")

      find(".cpy-todo-description-input").set("Second")
      find(".cpy-todo-description-input").send_keys(:enter)
      expect(page).to have_content("Second")

      find(".cpy-todo-description-input").send_keys(:escape)
      expect(page).to have_no_css(".cpy-todo-description-input")
    end

    expect(todo_list.reload.todos.order(:created_at).pluck(:description)).to eq(%w[First Second])
  end

  specify "pressing Esc exits edit mode without closing the modal" do
    todo = FactoryBot.create(:issue_todo, todo_list: todo_list, description: "Original")
    open_issue_detail

    within dom_id(todo) do
      find(".cpy-todo-text").click
      field = find(".cpy-todo-description-input")
      field.set("Changed text")
      field.send_keys(:escape)
    end

    within dom_id(todo) do
      expect(page).to have_content("Original")
      expect(page).to have_no_css(".cpy-todo-description-input")
    end
    expect(page).to have_content("My list")
    expect(todo.reload.description).to eq("Original")
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
