module ApplicationHelper
module Forms
  def form_with(**options, &block)
    options[:html] ||= {}
    options[:html][:autocomplete] ||= "off"
    super(**options, &block)
  end
end
end
