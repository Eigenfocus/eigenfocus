module Project::Templatable
  extend ActiveSupport::Concern

  AVAILABLE_TEMPLATES = [ :basic_kanban, :bug_tracking, :software_development, :customer_support, :crm ].freeze

  included do
    validates :use_template, inclusion: { in: AVAILABLE_TEMPLATES }, on: :create, if: -> { use_template.present? }
    after_create :apply_template, if: -> { use_template.present? }
  end

  def use_template=(value)
    return if value.blank?

    unless AVAILABLE_TEMPLATES.map(&:to_s).include?(value.to_s)
      raise ArgumentError, "Invalid project template"
    end

    @use_template = value.to_sym
  end

  def use_template
    @use_template
  end

  private

  def apply_template
    template_config = load_template_config
    Project::Templatable::TemplateApplier.new(self, template_config).apply
  end

  def load_template_config
    locale = I18n.locale.to_s.downcase
    file_path = Rails.root.join("config", "project_templates", "#{use_template}.#{locale}.yml")

    unless File.exist?(file_path)
      file_path = Rails.root.join("config", "project_templates", "#{use_template}.en.yml")
    end

    YAML.load_file(file_path).deep_symbolize_keys
  end
end
