require 'rails_helper'

describe "Template configuration validation" do
  let(:template_schema) {
    Dry::Schema.Params do
      required(:name).value(:string)
      required(:description).value(:string)
      required(:groupings).array(:string)
      required(:labels).array(:hash) do
        required(:title).value(:string)
        optional(:color).value(:string)
      end
      required(:sample_issues).array(:hash) do
        required(:title).value(:string)
        required(:description).value(:string)
        required(:labels).array(:string)
      end
    end
  }

  Project::Templatable::Template::AVAILABLE_TEMPLATES.product(I18n.available_locales).each do |template, locale|
    specify "Project template #{template} with locale #{locale} is valid" do
      file_path = Rails.root.join("config", "project_templates", "#{template}.#{locale}.yml")
      expect(File.exist?(file_path)).to be_truthy

      config = YAML.load_file(file_path)
      expect(template_schema.call(config)).to be_success
    end
  end
end
