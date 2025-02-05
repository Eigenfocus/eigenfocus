module ApplicationHelper
  include Pagy::Frontend

  include ApplicationHelper::Alerts
  include ApplicationHelper::Forms
  include ApplicationHelper::Modal
  include ApplicationHelper::Themes
  include ApplicationHelper::Icons
  include ApplicationHelper::PageTitle
  include ApplicationHelper::TimeTracking
end
