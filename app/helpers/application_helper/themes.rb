module ApplicationHelper
module Themes
  def current_theme_key
    Current.theme_key
  end

  def current_theme_stylesheet_link_tag(**kwargs)
    stylesheet_link_tag "#{current_theme_key}.theme", **kwargs
  end
end
end
