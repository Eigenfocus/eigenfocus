class Issue::Todo < ApplicationRecord
  belongs_to :todo_list, class_name: "Issue::TodoList"
  belongs_to :finished_by, class_name: "User", optional: true

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
