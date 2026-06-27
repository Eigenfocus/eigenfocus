class Issue::ChecklistItem < ApplicationRecord
  belongs_to :checklist, class_name: "Issue::Checklist"
  belongs_to :finished_by, class_name: "User", optional: true

  positioned on: :checklist, column: :position

  def finished?
    finished_at.present?
  end

  def finish!(user)
    update!(finished_at: Time.current, finished_by: user)
  end

  def unfinish!
    update!(finished_at: nil, finished_by: nil)
  end
end
