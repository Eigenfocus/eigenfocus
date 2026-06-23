class Issues::TodoListsController < ApplicationController
  def create
    @todo_list = current_issue.todo_lists.create(title: t("todo_lists.default_title"))
  end

  def edit
    @todo_list = current_issue.todo_lists.find(params[:id])
  end

  def update
    @todo_list = current_issue.todo_lists.find(params[:id])
    @todo_list.update(todo_list_params)
  end

  def destroy
    @todo_list = current_issue.todo_lists.find(params[:id])
    @todo_list.destroy
  end

  private

  def current_issue
    @current_issue ||= Issue.find(params[:issue_id])
  end

  def todo_list_params
    params.require(:issue_todo_list).permit(:title)
  end
end
