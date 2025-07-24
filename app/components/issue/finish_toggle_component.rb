# frozen_string_literal: true

class Issue::FinishToggleComponent < ViewComponent::Base
  def initialize(issue:, minimal_style: false)
    @issue = issue
    @minimal_style = minimal_style
  end

  def style_classes
    classes = []
    classes << "minimal" if @minimal_style
    classes << "finished" if @issue.finished?
    classes.join(" ")
  end
end
