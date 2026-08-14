require 'rails_helper'

describe "Issue checklist broadcasts", type: :model do
  include ActiveJob::TestHelper
  include ActionCable::TestHelper

  let(:user) { User.first_or_create }
  let(:project) { create(:project) }
  let(:issue) { create(:issue, project: project) }
  let(:stream) { "issue_#{issue.id}/checklists" }

  def broadcasts_from(&block)
    perform_enqueued_jobs do
      capture_broadcasts(stream, &block)
    end
  end

  def dom_id(*args)
    ActionView::RecordIdentifier.dom_id(*args)
  end

  describe Issue::Checklist do
    it "appends the checklist to the issue container when created" do
      messages = broadcasts_from { create(:issue_checklist, issue: issue, title: "Release steps") }

      expect(messages.size).to eq(1)
      expect(messages.first).to include('action="append"')
      expect(messages.first).to include("target=\"#{dom_id(issue, :checklists)}\"")
      expect(messages.first).to include("Release steps")
    end

    it "replaces the checklist when the title changes" do
      checklist = create(:issue_checklist, issue: issue)

      messages = broadcasts_from { checklist.update!(title: "Renamed") }

      expect(messages.size).to eq(1)
      expect(messages.first).to include('action="replace"')
      expect(messages.first).to include("target=\"#{dom_id(checklist)}\"")
      expect(messages.first).to include("Renamed")
    end

    it "removes the checklist when destroyed" do
      checklist = create(:issue_checklist, issue: issue)

      messages = broadcasts_from { checklist.destroy }

      expect(messages.last).to include('action="remove"')
      expect(messages.last).to include("target=\"#{dom_id(checklist)}\"")
    end
  end

  describe Issue::ChecklistItem do
    let(:checklist) { create(:issue_checklist, issue: issue) }

    before { checklist } # so its own creation broadcast is not captured below

    it "does not broadcast a blank item" do
      messages = broadcasts_from { checklist.items.create! }

      expect(messages).to be_empty
    end

    it "appends the item on the save that gives it a description" do
      item = checklist.items.create!

      messages = broadcasts_from { item.update!(description: "Buy milk") }

      expect(messages.size).to eq(1)
      expect(messages.first).to include('action="append"')
      expect(messages.first).to include("target=\"#{dom_id(checklist, :items)}\"")
      expect(messages.first).to include("Buy milk")
    end

    it "appends an item that is created with a description" do
      messages = broadcasts_from { create(:issue_checklist_item, checklist: checklist, description: "Ship it") }

      expect(messages.size).to eq(1)
      expect(messages.first).to include('action="append"')
      expect(messages.first).to include("Ship it")
    end

    it "replaces the item when the description changes again" do
      item = create(:issue_checklist_item, checklist: checklist, description: "Buy milk")

      messages = broadcasts_from { item.update!(description: "Buy oat milk") }

      expect(messages.size).to eq(1)
      expect(messages.first).to include('action="replace"')
      expect(messages.first).to include("target=\"#{dom_id(item)}\"")
      expect(messages.first).to include("Buy oat milk")
    end

    it "replaces the item when it is finished" do
      item = create(:issue_checklist_item, checklist: checklist, description: "Buy milk")

      messages = broadcasts_from { item.finish!(user) }

      expect(messages.size).to eq(1)
      expect(messages.first).to include('action="replace"')
      expect(messages.first).to include("line-through")
    end

    it "removes the item when destroyed" do
      item = create(:issue_checklist_item, checklist: checklist, description: "Buy milk")

      messages = broadcasts_from { item.destroy }

      expect(messages.last).to include('action="remove"')
      expect(messages.last).to include("target=\"#{dom_id(item)}\"")
    end
  end
end
