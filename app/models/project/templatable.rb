module Project::Templatable
  extend ActiveSupport::Concern

  TEMPLATES = {
    basic_kanban: {
      name: "Basic Kanban",
      description: "A simple TODO, DOING, DONE workflow with priority labels",
      groupings: [ "TODO", "DOING", "DONE" ],
      labels: [ "priority:high", "priority:low" ]
    }
  }

  included do
    attr_accessor :use_template
    validates :use_template, inclusion: { in: TEMPLATES.keys }, on: :create, allow_nil: true
    after_create :apply_template, if: :use_template
  end

  private

  def apply_template
    Project::Templatable::TemplateApplier.new(self, TEMPLATES[use_template.to_sym]).apply
  end
end
