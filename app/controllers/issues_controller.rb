class IssuesController < ApplicationController
  def pick_grouping
    issue = Issue.find(params[:id])
    grouping = issue.project.default_visualization.groupings.find_by(id: params[:grouping_id])

    if grouping.present?
      @allocation = issue.grouping_issue_allocations.first_or_initialize
      @allocation.update(grouping: grouping, position: :last)
    else
      @allocation = issue.grouping_issue_allocations.first_or_initialize
      @allocation.destroy
    end
  end

  def archive
    @issue = Issue.find(params[:id])
    @issue.archive!
  end

  def unarchive
    @issue = Issue.find(params[:id])
    @issue.unarchive!
  end

  def destroy
    @issue = Issue.find(params[:id])
    @issue.destroy
  end
end
