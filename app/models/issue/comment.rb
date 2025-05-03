class Issue::Comment < ApplicationRecord
  belongs_to :issue

  validates :content, presence: true
end
