class EmptyListComponent < ViewComponent::Base
  attr_reader :message, :action

  def initialize(message:, action: {})
    @message = message
    @action = action

    if action.present?
      action[:extra_options] ||= {}
    end
  end
end
