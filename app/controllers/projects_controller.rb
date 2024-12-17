class ProjectsController < ApplicationController
  def index
    flash.now[:success] = "Testing flash message"
  end
end
