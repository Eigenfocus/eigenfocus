require 'rails_helper'

describe Issue::Todo do
  let(:user) { User.first_or_create }
  let(:project) { create(:project) }
  let(:issue) { create(:issue, project: project) }
  let(:todo_list) { create(:issue_todo_list, issue: issue) }

  describe "#finish!" do
    it "records the time and the user who finished it" do
      todo = create(:issue_todo, todo_list: todo_list)

      todo.finish!(user)

      expect(todo.finished?).to be(true)
      expect(todo.finished_at).to be_present
      expect(todo.finished_by).to eq(user)
    end
  end

  describe "#unfinish!" do
    it "clears the time and the user" do
      todo = create(:issue_todo, :finished, todo_list: todo_list, finished_by: user)

      todo.unfinish!

      expect(todo.finished?).to be(false)
      expect(todo.finished_at).to be_nil
      expect(todo.finished_by).to be_nil
    end
  end
end
