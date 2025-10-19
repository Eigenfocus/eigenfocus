# frozen_string_literal: true

class Modal::DialogComponent < ViewComponent::Base
  attr_reader :title, :icon, :dialog_options

  def initialize(title: nil, icon: nil, dialog_options: {})
    @title = title
    @icon = icon
    @dialog_options = dialog_options
  end

  def render_title
    return if title.blank?
    render Modal::TitleComponent.new(title: title, icon: icon)
  end

  def dialog_classes
    dialog_options[:class].to_s
  end
end
