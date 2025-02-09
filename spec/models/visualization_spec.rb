require 'rails_helper'

describe Visualization do
  describe '#favorite_issue_labels' do
    it "returns at least 6 elements" do
      visualization = FactoryBot.create :visualization
      visualization.favorite_issue_labels = []
      visualization.save!

      expect(visualization.favorite_issue_labels).to eq (Array.new(6))
    end
  end
end
