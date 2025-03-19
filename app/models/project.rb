class Project < ApplicationRecord
  # Attributes
  attribute :use_template, :string

  # Relations
  has_many :visualizations, dependent: :destroy
  has_many :time_entries, dependent: :destroy
  has_many :issues, dependent: :destroy
  has_many :issue_labels, dependent: :destroy

  # Validations
  validates :name, presence: true
  validates :use_template, inclusion: { in: Project::Templatable::Template::AVAILABLE_TEMPLATES }, on: :create, if: -> { use_template.present? }

  # Hookes
  after_create :apply_template, if: -> { use_template.present? }

  def default_visualization
    visualizations.first_or_create
  end

  def archived?
    archived_at.present?
  end

  def unarchive!
    self.archived_at = nil
    save!
  end

  def archive!
    self.archived_at = Date.current
    save!
  end

  private def apply_template
    template = Project::Templatable::Template.find(use_template)
    Project::Templatable::TemplateApplier.new(self, template).apply
  end
end
