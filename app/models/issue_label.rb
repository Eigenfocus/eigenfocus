class IssueLabel < ApplicationRecord
  # Relationships
  has_and_belongs_to_many :issues,
    join_table: :issue_labels_links,
    class_name: "Issue"

  # Validations
  validates :title, presence: true, uniqueness: { case_sensitive: false }

  # Hooks
  before_validation :strip_title_whitepaces

  def strip_title_whitepaces
    self.title = self.title&.strip
  end
end
