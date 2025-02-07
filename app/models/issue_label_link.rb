class IssueLabelLink < ApplicationRecord
  belongs_to :issue, touch: true
  belongs_to :issue_label

  validates :issue_label_id, uniqueness: { scope: :issue_id }
end
