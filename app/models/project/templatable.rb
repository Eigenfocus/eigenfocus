module Project::Templatable
  extend ActiveSupport::Concern

  TEMPLATES = {
    basic_kanban: {
      name: "Basic Kanban",
      description: "A simple TODO, DOING, DONE workflow with priority labels",
      groupings: [ "TODO", "DOING", "DONE" ],
      labels: [ "priority:high", "priority:low" ],
      sample_issues: [
        {
          title: "Update company brochure",
          description: "Create new marketing brochure with updated pricing and recent client testimonials",
          labels: [ "priority:high" ]
        },
        {
          title: "Plan team building event",
          description: "Organize quarterly team building activity. Need to book venue, plan activities, and arrange catering for 25 people",
          labels: [ "priority:low" ]
        },
        {
          title: "Office supply inventory",
          description: "Review current office supplies, create inventory list, and order necessary items for next quarter",
          labels: [ "priority:low" ]
        }
      ]
    },

    bug_tracking: {
      name: "Bug Tracking",
      description: "Track and manage software bugs with severity levels",
      groupings: [ "Reported", "Investigating", "In Progress", "QA Testing", "Resolved" ],
      labels: [ "severity:critical", "severity:high", "severity:medium", "severity:low", "regression", "needs-reproduction" ],
      sample_issues: [
        {
          title: "App crashes on user profile update",
          description: "Users report app crash when updating profile picture. Steps: 1. Go to profile 2. Click edit 3. Upload new image",
          labels: [ "severity:high", "needs-reproduction" ]
        },
        {
          title: "Login page shows incorrect error message",
          description: "When entering wrong password, error message says 'Username not found' instead of 'Invalid credentials'",
          labels: [ "severity:low" ]
        },
        {
          title: "Payment processing timeout",
          description: "Payment gateway timeout occurring during high traffic periods causing failed transactions",
          labels: [ "severity:critical" ]
        }
      ]
    },

    software_development: {
      name: "Software Development",
      description: "Agile software development workflow with feature tracking",
      groupings: [ "Backlog", "Design", "Development", "Code Review", "QA", "Ready to Deploy", "Done" ],
      labels: [ "type:feature", "type:refactor", "type:tech-debt", "size:small", "size:medium", "size:large", "priority:urgent" ],
      sample_issues: [
        {
          title: "Implement OAuth2 Authentication",
          description: "Add support for Google and GitHub OAuth2 authentication. Include user profile sync and token refresh handling",
          labels: [ "type:feature", "size:large" ]
        },
        {
          title: "Refactor User Service Class",
          description: "Split UserService into smaller, more focused classes following single responsibility principle",
          labels: [ "type:refactor", "size:medium" ]
        },
        {
          title: "Update Dependencies to Latest Versions",
          description: "Update all major dependencies to their latest stable versions and fix any breaking changes",
          labels: [ "type:tech-debt", "priority:urgent" ]
        }
      ]
    },

    customer_support: {
      name: "Customer Support",
      description: "Track and manage customer support tickets",
      groupings: [ "New Tickets", "Awaiting Info", "In Progress", "Pending Review", "Resolved", "Closed" ],
      labels: [ "priority:urgent", "priority:normal", "type:technical", "type:billing", "type:account", "satisfaction:happy", "satisfaction:unhappy" ],
      sample_issues: [
        {
          title: "Cannot access premium features after upgrade",
          description: "Customer upgraded to premium plan but features still show as locked. Account: CUST-123",
          labels: [ "type:billing", "priority:urgent" ]
        },
        {
          title: "Need help with API integration",
          description: "Customer needs assistance implementing webhook notifications. Using Node.js client",
          labels: [ "type:technical", "priority:normal" ]
        },
        {
          title: "Request for bulk export feature",
          description: "Enterprise customer requesting ability to bulk export all reports to CSV",
          labels: [ "type:account", "satisfaction:happy" ]
        }
      ]
    },

    crm: {
      name: "CRM Pipeline",
      description: "Customer relationship management and sales pipeline",
      groupings: [ "Lead", "Initial Contact", "Meeting Scheduled", "Proposal Sent", "Negotiation", "Won", "Lost" ],
      labels: [ "value:high", "value:medium", "value:low", "source:referral", "source:website", "source:conference", "type:new-business", "type:upsell" ],
      sample_issues: [
        {
          title: "Enterprise Solution for TechCorp Inc.",
          description: "Potential enterprise client interested in full platform deployment. Annual contract value: $250K",
          labels: [ "value:high", "source:conference", "type:new-business" ]
        },
        {
          title: "Additional Licenses for Acme Co",
          description: "Existing client requesting quote for 25 additional user licenses",
          labels: [ "value:medium", "type:upsell" ]
        },
        {
          title: "Startup Package for InnovateLab",
          description: "Startup referred by existing client, interested in basic package with potential for growth",
          labels: [ "value:low", "source:referral", "type:new-business" ]
        }
      ]
    }
  }

  included do
    validates :use_template, inclusion: { in: TEMPLATES.keys }, on: :create, if: -> { use_template.present? }
    after_create :apply_template, if: -> { use_template.present? }
  end

  def use_template=(value)
    return if value.blank?

    unless TEMPLATES.keys.map(&:to_s).include?(value.to_s)
      raise ArgumentError, "Invalid project template"
    end

    @use_template = value.to_sym
  end

  def use_template
    @use_template
  end

  private

  def apply_template
    Project::Templatable::TemplateApplier.new(self, TEMPLATES[use_template.to_sym]).apply
  end
end
