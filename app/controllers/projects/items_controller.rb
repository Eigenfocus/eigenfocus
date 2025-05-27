class Projects::ItemsController < Projects::BaseController
  def show
    issue = current_project.issues.find_by(id: params[:id])

    if issue.present?
      redirect_to project_show_issue_path(current_project, issue)
    else
      redirect_to root_path, alert: t("flash.projects.items.show.error")
    end
  end
end
