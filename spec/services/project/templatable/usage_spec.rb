require 'rails_helper'

describe "Project Templates" do
  specify 'All templates can be applied successfully' do
    Project::Templatable::Template.all.each do |template|
      project = build(:project)
      project.use_template = template.key
      project.save!

      expect(project).to be_persisted
    end
  end
end
