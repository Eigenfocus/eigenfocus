module IssueEmbeddable
  extend ActiveSupport::Concern

  included do
    # required for rendering the whole layout with the issue_detail partial
    layout "application"

    def open_issue(issue, **opts)
      @issue_detail_context = {
        issue: issue,
        destroy_path: issue_path(issue),
        form_path: issue_path(issue)
      }.merge(opts)
    end
  end
end
