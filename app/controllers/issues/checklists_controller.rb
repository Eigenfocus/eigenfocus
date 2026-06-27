class Issues::ChecklistsController < ApplicationController
  def create
    @checklist = current_issue.checklists.create(title: t("checklists.default_title"))
  end

  def show
    @checklist = current_issue.checklists.find(params[:id])
  end

  def edit
    @checklist = current_issue.checklists.find(params[:id])
  end

  def update
    @checklist = current_issue.checklists.find(params[:id])
    @checklist.update(checklist_params)
  end

  def destroy
    @checklist = current_issue.checklists.find(params[:id])
    @checklist.destroy
  end

  private

  def current_issue
    @current_issue ||= Issue.find(params[:issue_id])
  end

  def checklist_params
    params.require(:issue_checklist).permit(:title)
  end
end
