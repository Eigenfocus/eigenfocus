require 'rails_helper'

describe Visualization do
  describe '#move_grouping!' do
    let(:visualization) { FactoryBot.create :visualization }

    before(:each) do
      FactoryBot.create(:grouping, visualization: visualization, position: 0, title: "First")
      FactoryBot.create(:grouping, visualization: visualization, position: 1, title: "Second")
      FactoryBot.create(:grouping, visualization: visualization, position: 2, title: "Third")
      FactoryBot.create(:grouping, visualization: visualization, position: 3, title: "Fourth")
      FactoryBot.create(:grouping, visualization: visualization, position: 4, title: "Fifth")
    end

    it "Updates the grouping position for groupings moving to the right" do
      visualization.move_grouping!(from: 1, to: 3)
      visualization.reload

      expect(visualization.groupings.pluck(:title)).to eq([
        "First",
        "Third",
        "Fourth",
        "Second",
        "Fifth"
      ])
    end

    it "Updates the grouping position for groupings moving to the left" do
      visualization.move_grouping!(from: 3, to: 1)
      visualization.reload

      expect(visualization.groupings.pluck(:title)).to eq([
        "First",
        "Fourth",
        "Second",
        "Third",
        "Fifth"
      ])
    end

    it "Does nothing when the from and to position is the same" do
      visualization.move_grouping!(from: 2, to: 2)
      visualization.reload

      expect(visualization.groupings.pluck(:title)).to eq([
        "First",
        "Second",
        "Third",
        "Fourth",
        "Fifth"
      ])
    end
  end
end
