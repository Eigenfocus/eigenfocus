# frozen_string_literal: true

class Issue::FinishToggleComponent < ViewComponent::Base
  def initialize(issue:)
    @issue = issue
  end
end
