module ApplicationHelper
  include Pagy::Frontend
  include ApplicationHelper::CustomPagy

  include ApplicationHelper::Alerts
  include ApplicationHelper::Forms
  include ApplicationHelper::Modal
  include ApplicationHelper::Themes
  include ApplicationHelper::Icons
  include ApplicationHelper::PageTitle
  include ApplicationHelper::TimeTracking
  include ApplicationHelper::Labels
  include ApplicationHelper::WebsocketsSecurity

  def contextualized_form_path(local_assigns)
    if local_assigns[:visualization].present?
      visualization_issue_path(local_assigns[:visualization], local_assigns[:issue])
    else
      # No other case yet
    end
  end

  def contextualized_back_path(local_assigns)
    if local_assigns[:visualization].present?
      visualization_path(local_assigns[:visualization])
    else
      # No other case yet
    end
  end
end
