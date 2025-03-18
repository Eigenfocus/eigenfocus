class Project::Templatable::Template < Dry::Struct
  AVAILABLE_TEMPLATES = [ :basic_kanban, :bug_tracking, :software_development, :customer_support, :crm ].freeze

  module Types
    include Dry::Types()
  end

  attribute :key, Types::Symbol
  attribute :name, Types::String
  attribute :description, Types::String
  attribute :groupings, Types::Array.of(Types::String)
  attribute :labels, Types::Array.of(Types::String)
  attribute :sample_issues, Types::Array do
    attribute :title, Types::String
    attribute :description, Types::String
    attribute :labels, Types::Array.of(Types::String)
  end

  def self.all
    AVAILABLE_TEMPLATES.map { |template_name| find(template_name) }
  end

  def self.find(template_name)
    new(load_template_config_for(template_name).merge(key: template_name))
  end

  def self.load_template_config_for(template_name)
    locale = I18n.locale.to_s.downcase
    file_path = Rails.root.join("config", "project_templates", "#{template_name}.#{locale}.yml")

    unless File.exist?(file_path)
      file_path = Rails.root.join("config", "project_templates", "#{template_name}.en.yml")
    end

    YAML.load_file(file_path).deep_symbolize_keys
  end
end
