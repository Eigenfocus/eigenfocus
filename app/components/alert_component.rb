# frozen_string_literal: true

class AlertComponent < ViewComponent::Base
  attr_reader :message, :type

  renders_many :actions

  def initialize(message:, type: nil)
    @message = message
    @type = type
  end
end
