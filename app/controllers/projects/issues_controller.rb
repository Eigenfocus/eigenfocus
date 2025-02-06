class Projects::IssuesController < ApplicationController
  helper_method :current_project

  def index
    @q = current_project.issues.ransack(params[:q])
    @pagy, @issues = pagy(@q.result.includes(:labels))
  end

  def add_label
    issue = Issue.find(params[:id])
    label = IssueLabel.find_or_create_by({
      title: params[:label][:title],
      project_id: issue.project_id
    })

    if issue.labels.exclude?(label)
      issue.labels << label
    end

    head :ok
  end

  def remove_label
    issue = Issue.find(params[:id])
    label = issue.labels.find_by(title: params[:label][:title])

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
