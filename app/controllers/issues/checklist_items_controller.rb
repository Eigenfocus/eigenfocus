class Issues::ChecklistItemsController < ApplicationController
  def create
    @item = current_checklist.items.create
  end

  def show
    @item = current_checklist.items.find(params[:id])
  end

  def edit
    @item = current_checklist.items.find(params[:id])
  end

  def update
    @item = current_checklist.items.find(params[:id])

    if item_params[:description].blank?
      @item.destroy
    else
      @item.update(item_params)
      @new_item = current_checklist.items.create if params[:continue] == "1"
    end
  end

  def destroy
    @item = current_checklist.items.find(params[:id])
    @item.destroy
  end

  def toggle
    @item = current_checklist.items.find(params[:id])

    if @item.finished?
      @item.unfinish!
    else
      @item.finish!(current_user)
    end
  end

  def move
    item = current_checklist.items.find_by!(position: move_params[:from][:position])
    item.update(position: move_params[:to][:position])
    head :ok
  end

  private

  def current_issue
    @current_issue ||= Issue.find(params[:issue_id])
  end

  def current_checklist
    @current_checklist ||= current_issue.checklists.find(params[:checklist_id])
  end

  def item_params
    params.require(:issue_checklist_item).permit(:description)
  end

  def move_params
    params.deep_transform_keys(&:to_sym)
  end
end
