module ApplicationHelper
module PageTitle
  def page_title
    if content_for?(:title).present?
      content_for(:title) + " | Eigenfocus"
    else
      "Eigenfocus"
    end
  end

  def set_page_title(key = "", options = {})
    if block_given?
      content_for(:title) { yield }
    else
      options[:scope] = [ :page_title ]
      options[:default] = ""
      title_text = I18n.t(key, **options)
      content_for(:title) { title_text }
    end
  end
end
end
