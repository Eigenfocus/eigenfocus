class Issues::TodosController < ApplicationController
  def create
    @todo = current_todo_list.todos.create
  end

  def show
    @todo = current_todo_list.todos.find(params[:id])
  end

  def edit
    @todo = current_todo_list.todos.find(params[:id])
  end

  def update
    @todo = current_todo_list.todos.find(params[:id])

    if todo_params[:description].blank?
      @todo.destroy
    else
      @todo.update(todo_params)
      @new_todo = current_todo_list.todos.create if params[:continue] == "1"
    end
  end

  def destroy
    @todo = current_todo_list.todos.find(params[:id])
    @todo.destroy
  end

  def toggle
    @todo = current_todo_list.todos.find(params[:id])

    if @todo.finished?
      @todo.unfinish!
    else
      @todo.finish!(current_user)
    end
  end

  private

  def current_issue
    @current_issue ||= Issue.find(params[:issue_id])
  end

  def current_todo_list
    @current_todo_list ||= current_issue.todo_lists.find(params[:todo_list_id])
  end

  def todo_params
    params.require(:issue_todo).permit(:description)
  end
end
