class Projects::BaseController < ApplicationController
  helper_method :current_project

  private
  def current_project
    @current_project ||= Project.find(params[:project_id])
  end
end
