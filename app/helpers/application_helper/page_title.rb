module ApplicationHelper
module PageTitle
  def page_title
    if content_for?(:title).present?
      content_for(:title) + " | Eigenfocus"
    else
      "Eigenfocus"
    end
  end

  def set_page_title(key, options = {})
    options[:scope] = [ :page_title ]
    options[:default] = ""
    title_text = I18n.t(key, **options)
    content_for(:title) { title_text }
  end
end
end
