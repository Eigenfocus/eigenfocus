module Project::Templatable
  extend ActiveSupport::Concern

  included do
    validates :use_template, inclusion: { in: Project::Templatable::Template::AVAILABLE_TEMPLATES }, on: :create, if: -> { use_template.present? }
    after_create :apply_template, if: -> { use_template.present? }
  end

  def use_template=(value)
    return if value.blank?

    unless Project::Templatable::Template::AVAILABLE_TEMPLATES.map(&:to_s).include?(value.to_s)
      raise ArgumentError, "Invalid project template"
    end

    @use_template = value.to_sym
  end

  def use_template
    @use_template
  end

  private

  def apply_template
    template = Project::Templatable::Template.find(use_template)
    Project::Templatable::TemplateApplier.new(self, template).apply
  end
end
