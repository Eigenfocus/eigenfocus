module Project::Templatable
  extend ActiveSupport::Concern

  included do
    attribute :use_template, :string
    validates :use_template, inclusion: { in: Project::Templatable::Template::AVAILABLE_TEMPLATES }, on: :create, if: -> { use_template.present? }
    after_create :apply_template, if: -> { use_template.present? }
  end

  private

  def apply_template
    template = Project::Templatable::Template.find(use_template)
    Project::Templatable::TemplateApplier.new(self, template).apply
  end
end
