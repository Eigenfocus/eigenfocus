# frozen_string_literal: true

class ActionSheetComponent < ViewComponent::Base
  attr_reader :title, :trigger_label, :trigger_icon, :wrapper_class, :trigger_class

  def initialize(title:, trigger_label:, trigger_icon: "ti ti-dots-vertical", wrapper_class: "", trigger_class: "btn btn-sm btn-ghost")
    @title = title
    @trigger_label = trigger_label
    @trigger_icon = trigger_icon
    @wrapper_class = wrapper_class
    @trigger_class = trigger_class
  end
end
