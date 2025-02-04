class IssueLabel < ApplicationRecord
  # Relationships
  has_and_belongs_to_many :issues,
    join_table: :issue_labels_links,
    class_name: 'Issue'

  # Validations
  validates :title, presence: true, uniqueness: { case_sensitive: false }

  # Hooks
  before_validation :strip_title_whitepaces
  before_validation :strip_color_whitepaces

  def strip_title_whitepaces
    self.title = self.title&.strip
  end

  def strip_color_whitepaces
    self.color = self.color&.strip
  end
end