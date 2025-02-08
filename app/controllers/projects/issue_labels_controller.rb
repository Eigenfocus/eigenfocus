class Projects::IssueLabelsController < ApplicationController
  helper_method :current_project

  def index
    @q = current_project.issue_labels.ransack(params[:q])
    @pagy, @issue_labels = pagy(@q.result)
  end

  def edit
    @issue_label = current_project.issue_labels.find(params[:id])

    render partial: "form", locals: { project: current_project, issue_label: @issue_label }
  end

  def update
    @issue_label = current_project.issue_labels.find(params[:id])

    @updated = @issue_label.update(label_params)
  end

  private
  def current_project
    @current_project ||= Project.find(params[:project_id])
  end

  def label_params
    params.require(:issue_label).permit(:title)
  end
end
