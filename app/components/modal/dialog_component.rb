# frozen_string_literal: true

class Modal::DialogComponent < ViewComponent::Base
  attr_reader :title, :icon, :modal_box, :open, :dialog_id

  def initialize(title: nil, icon: nil, modal_box: {}, open: true, dialog_id: nil)
    @title = title
    @icon = icon
    @modal_box = modal_box
    modal_box[:class] = modal_box[:class].to_s + " modal-box"
    @open = open
    @dialog_id = dialog_id
  end

  def render_title
    return if title.blank?
    render Modal::TitleComponent.new(title: title, icon: icon)
  end
end
