# frozen_string_literal: true

class Modal::DialogComponent < ViewComponent::Base
  MOBILE_BOX_CLASSES = {
    sheet: "max-sm:max-h-[90dvh] max-sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
    fullscreen: "max-sm:w-full max-sm:max-w-none max-sm:h-dvh max-sm:max-h-dvh max-sm:rounded-none max-sm:pb-safe",
    none: ""
  }.freeze

  attr_reader :title, :icon, :modal_box, :open, :dialog_id, :emit_close_event, :mobile_layout

  renders_one :header

  def initialize(title: nil, icon: nil, modal_box: {}, open: true, dialog_id: nil, hide_close_button: false, emit_close_event: true, mobile_layout: :sheet)
    raise ArgumentError, "Invalid mobile_layout: #{mobile_layout}" unless MOBILE_BOX_CLASSES.key?(mobile_layout)

    @title = title
    @icon = icon
    @mobile_layout = mobile_layout
    @modal_box = modal_box
    modal_box[:class] = [ modal_box[:class], "modal-box", MOBILE_BOX_CLASSES[mobile_layout] ].compact_blank.join(" ")
    @open = open
    @dialog_id = dialog_id
    @hide_close_button = hide_close_button
    @emit_close_event = emit_close_event
  end

  def dialog_class
    return "modal" if mobile_layout == :none

    "modal max-sm:modal-bottom"
  end

  def render_title
    return if title.blank?
    render Modal::TitleComponent.new(title: title, icon: icon)
  end

  def hide_close_button?
    @hide_close_button
  end
end
