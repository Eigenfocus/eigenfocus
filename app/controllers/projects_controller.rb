class ProjectsController < ApplicationController
  def index
    @projects = Project.order(archived_at: :asc, name: :asc).all
  end

  def new
    @project = Project.new
    render partial: "form", locals: { project: @project  }
  end

  def create
    @project = Project.new(project_params)

    @project.visualizations.first_or_initialize

    @project.save
  end

  def edit
    @project = Project.find(params[:id])
    render partial: "form", locals: { project: @project }
  end

  def update
    @project = Project.find(params[:id])

    @updated = @project.update(project_params)
  end

  def archive
    @project = Project.find(params[:id])

    @project.archive!
  end

  def unarchive
    @project = Project.find(params[:id])

    @project.unarchive!
  end

  private

  def project_params
    params.require(:project).permit(:name, :archived, :time_tracking_enabled)
  end
end
