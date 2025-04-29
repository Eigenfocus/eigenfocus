class Projects::IssueLabelsController < Projects::BaseController
  def index
    @q = current_project.issue_labels.ransack(params[:q])
    @q.sorts = "updated_at desc" if @q.sorts.empty?

    @pagy, @issue_labels = pagy(@q.result)
  end

  def new
    @issue_label = current_project.issue_labels.new

    if turbo_frame_request?
      render partial: "form", locals: { project: current_project, issue_label: @issue_label }
    else
      redirect_to project_issue_labels_path(current_project, open_form: true)
    end
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

    if turbo_frame_request?
      render partial: "form", locals: { project: current_project, issue_label: @issue_label }
    else
      redirect_to project_issue_labels_path(current_project, open_form: true, form_issue_label_id: @issue_label.id)
    end
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
  def label_params
    params.require(:issue_label).permit(:title, :hex_color)
  end
end
