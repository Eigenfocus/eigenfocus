class Projects::IssuesController < ApplicationController
  include IssuesHelper

  helper_method :current_project

  def index
    @q = current_project.issues.ransack(params[:q])
    @pagy, @issues = pagy(@q.result.includes(:labels))

    if params[:id]
      @open_issue = Issue.find(params[:id])
    end
  end

  def update
    @issue = Issue.find(params[:id])
    @updated = @issue.update(permitted_params)
  end

  def destroy
    @issue = Issue.find(params[:id])
    @issue.destroy
  end

  def add_label
    issue = Issue.find(params[:id])
    label = current_project.issue_labels.with_title(params[:label][:title]).first
    label ||= current_project.issue_labels.create(title: params[:label][:title])

    if issue.labels.exclude?(label)
      issue.labels << label
    end

    head :ok
  end

  def remove_label
    issue = Issue.find(params[:id])
    label = issue.labels.with_title(params[:label][:title]).first

    # "Prevents" (at least for % 99,42 of the cases)
    # Simultaneous requests/crazy multiple clicks
    if label
      issue.labels.destroy(label)
    end

    head :ok
  end

  private
  def current_project
    @current_project ||= Project.find(params[:project_id])
  end

  def permitted_params
    params.require(:issue).permit(:title, :description, files: [])
  end
end
