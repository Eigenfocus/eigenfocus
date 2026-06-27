class Issue::Checklist < ApplicationRecord
  belongs_to :issue
  has_many :items, class_name: "Issue::ChecklistItem", foreign_key: :checklist_id, dependent: :destroy

  validates :title, presence: true
end
