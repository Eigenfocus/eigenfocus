# frozen_string_literal: true

class Modal::DialogComponent < ViewComponent::Base
  attr_reader :title, :icon, :modal_box

  def initialize(title: nil, icon: nil, modal_box: {})
    @title = title
    @icon = icon
    @modal_box = modal_box
    modal_box[:class] = modal_box[:class].to_s + " modal-box"
  end

  def render_title
    return if title.blank?
    render Modal::TitleComponent.new(title: title, icon: icon)
  end
end
