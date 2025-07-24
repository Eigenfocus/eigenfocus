# frozen_string_literal: true

class Issue::FinishToggleComponent < ViewComponent::Base
  def initialize(issue:, minimal_style: false, has_hover_animation: true)
    @issue = issue
    @minimal_style = minimal_style
    @has_hover_animation = has_hover_animation
  end

  def has_hover_animation?
    @has_hover_animation
  end

  def check_style_classes
    classes = []
    classes << "minimal" if @minimal_style
    classes << "finished" if @issue.finished?
    classes.join(" ")
  end
end
