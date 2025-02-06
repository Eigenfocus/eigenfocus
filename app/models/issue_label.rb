class IssueLabel < ApplicationRecord
  # Scopes
  default_scope { order(title: :asc) }
  scope :with_title, ->(title) { where("lower(title) LIKE ?", title) }

  # Relationships
  has_many :issue_links, class_name: "IssueLabelLink", dependent: :destroy
  has_many :issues, through: :issue_links, source: :issue

  belongs_to :project

  # Validations
  validates :title, presence: true, uniqueness: { case_sensitive: false, scope: [ :project_id ] }

  # Hooks
  before_validation :strip_title_whitepaces

  def strip_title_whitepaces
    self.title = self.title&.strip
  end

  def to_s
    title
  end
end
