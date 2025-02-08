class Projects::IssueLabelsController < ApplicationController
  helper_method :current_project

  def index
    @q = current_project.issue_labels.ransack(params[:q])
    @q.sorts = "updated_at desc" if @q.sorts.empty?

    @pagy, @issue_labels = pagy(@q.result)
  end

  def new
    @issue_label = current_project.issue_labels.new
    render partial: "form", locals: { project: current_project, issue_label: @issue_label }
  end

  def create
    @issue_label = current_project.issue_labels.new(label_params)

    if @issue_label.save
      redirect_to project_issue_labels_path, notice: t_flash_message(@issue_label)
    else
      render turbo_stream: turbo_stream.replace(
        "issue_label_form",
        partial: "form", locals: { project: current_project, issue_label: @issue_label }
      )
    end
  end

  def edit
    @issue_label = current_project.issue_labels.find(params[:id])

    render partial: "form", locals: { project: current_project, issue_label: @issue_label }
  end

  def update
    @issue_label = current_project.issue_labels.find(params[:id])

    @updated = @issue_label.update(label_params)
  end

  def destroy_confirmation
    @issue_label = current_project.issue_labels.find(params[:id])
  end

  def destroy
    @issue_label = current_project.issue_labels.find(params[:id])

    @issue_label.destroy

    redirect_to project_issue_labels_path, notice: t_flash_message(@issue_label)
  end

  private
  def current_project
    @current_project ||= Project.find(params[:project_id])
  end

  def label_params
    params.require(:issue_label).permit(:title)
  end
end
