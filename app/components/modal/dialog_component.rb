# frozen_string_literal: true

class Modal::DialogComponent < ViewComponent::Base
  attr_reader :title, :icon

  def initialize(title: nil, icon: nil)
    @title = title
    @icon = icon
  end

  def render_title
    return if title.blank?
    render Modal::TitleComponent.new(title: title, icon: icon)
  end
end
