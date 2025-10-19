# frozen_string_literal: true

class Modal::TitleComponent < ViewComponent::Base
  attr_reader :title, :icon

  erb_template <<-ERB
    <div class="border-b border-base-200 mb-4">
      <div class="flex items-center space-x-2 pb-2">
        <% if icon.present? %>
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 p-1 text-base-content ">
            <%= icon.html_safe %>
          </div>
        <% end %>
        <h4 class="font-bold text-lg">
          <%= title %>
        </h4>
      </div>
    </div>
  ERB


  def initialize(title: nil, icon: nil)
    @title = title
    @icon = icon
  end
end
