# frozen_string_literal: true

class Issue::FinishToggleComponent < ViewComponent::Base
  attr_reader :issue

  def initialize(issue:)
    @issue = issue
  end
end
