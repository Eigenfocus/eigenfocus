class Project::Templatable::Template < Dry::Struct
  module Types
    include Dry::Types()
  end

  attribute :name, Types::String
  attribute :description, Types::String
  attribute :groupings, Types::Array.of(Types::String)
  attribute :labels, Types::Array.of(Types::String)
  attribute :sample_issues, Types::Array do
    attribute :title, Types::String
    attribute :description, Types::String
    attribute :labels, Types::Array.of(Types::String)
  end
end
