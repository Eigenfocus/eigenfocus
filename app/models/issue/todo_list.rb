class Issue::TodoList < ApplicationRecord
  belongs_to :issue
  has_many :todos, class_name: "Issue::Todo", foreign_key: :todo_list_id, dependent: :destroy

  validates :title, presence: true
end
