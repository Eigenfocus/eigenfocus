class Projects::IssuesController < ApplicationController
  include IssueEmbeddable

  helper_method :current_project

  def index
    @q = current_project.issues.ransack(params[:q])
    @q.sorts = "updated_at desc" if @q.sorts.empty?

    @pagy, @issues = pagy(@q.result.includes(:labels, :groupings))

    if params[:id]
      @issue = Issue.find(params[:id])
      open_issue(
        @issue,
        back_path: project_issues_path(current_project),
        form_path: project_issue_path(current_project, @issue)
      )
    end
  end

  def new
    @issue = Issue.new
  end

  def create
    @issue = current_project.issues.new(permitted_params)

    if @issue.save
      redirect_to project_issues_path, notice: t_flash_message(@issue)
    else
      render turbo_stream: turbo_stream.replace(
        "new_issue_form",
        partial: "issues/create", locals: { issue: @issue }
      )
    end
  end

  def update
    @issue = Issue.find(params[:id])
    @updated = @issue.update(permitted_params)
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
