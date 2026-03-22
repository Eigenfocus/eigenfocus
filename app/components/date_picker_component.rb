# frozen_string_literal: true

class DatePickerComponent < ViewComponent::Base
  def initialize(name:, value: nil, id: nil, min: nil, max: nil, show_clear_button: false, input_class: "", data: {})
    @name = name
    @value = value.is_a?(Date) ? value.strftime("%Y-%m-%d") : value.to_s
    @id = id
    @min = min
    @max = max
    @show_clear_button = show_clear_button
    @input_class = input_class
    @data = data
    @popover_id = "cally-popover-#{SecureRandom.hex(4)}"
  end

  private

  attr_reader :name, :value, :min, :max, :show_clear_button, :input_class, :data, :popover_id

  def input_id
    @id || name.gsub(/[\[\]]/, "_").gsub(/_+$/, "")
  end

  def input_data_attributes
    base = {
      "cally-datepicker-target": "input",
      action: "click->cally-datepicker#toggle"
    }

    merged = base.merge(data)

    if data[:action].present?
      merged[:action] = "click->cally-datepicker#toggle #{data[:action]}"
    end

    merged
  end
end
