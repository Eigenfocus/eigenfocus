require 'rails_helper'

describe Issue::ChecklistItem do
  let(:user) { User.first_or_create }
  let(:project) { create(:project) }
  let(:issue) { create(:issue, project: project) }
  let(:checklist) { create(:issue_checklist, issue: issue) }

  describe "#finish!" do
    it "records the time and the user who finished it" do
      item = create(:issue_checklist_item, checklist: checklist)

      item.finish!(user)

      expect(item.finished?).to be(true)
      expect(item.finished_at).to be_present
      expect(item.finished_by).to eq(user)
    end
  end

  describe "#unfinish!" do
    it "clears the time and the user" do
      item = create(:issue_checklist_item, :finished, checklist: checklist, finished_by: user)

      item.unfinish!

      expect(item.finished?).to be(false)
      expect(item.finished_at).to be_nil
      expect(item.finished_by).to be_nil
    end
  end
end
