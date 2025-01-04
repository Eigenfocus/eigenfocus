class Groupings::IssuesController < ApplicationController
  helper_method :current_grouping

  def new
    @issue = Issue.new

    render partial: "form", locals: { grouping: current_grouping, issue: @issue  }
  end

  def create
    @issue = Issue.new(permitted_params.merge(project_id: current_grouping.project.id))

    ActiveRecord::Base.transaction do
      if @issue.save
        current_grouping.allocate_issue(@issue)
      end
    end
  end

  def edit
    @issue = Issue.find(params[:id])
    render partial: "form", locals: { grouping: current_grouping, issue: @issue  }
  end

  def update
    @issue = Issue.find(params[:id])
    @updated = @issue.update(permitted_params)
  end

  def destroy
    @allocation = current_grouping.allocations.find_by(issue_id: params[:id])
    @issue = @allocation.issue

    @allocation.destroy
  end
  private
  def current_grouping
    @current_grouping ||= Grouping.find(params[:grouping_id])
  end

  def permitted_params
    params.require(:issue).permit(:title, :description)
  end
end
