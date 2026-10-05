require 'rails_helper'

describe "Issue files" do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project) }
  let!(:issue) { FactoryBot.create(:issue, project:) }

  specify "I can attach a file to an issue" do
    visit project_issues_path(project)

    within dom_id(issue) do
      find(".cpy-edit-button").click
    end

    expect(page).to have_css("#issue-#{issue.id}-file-list", visible: :all)
    find(".dz-hidden-input", visible: false).attach_file(file_fixture("image.png"), make_visible: true)

    within "#issue-#{issue.id}-file-list" do
      expect(page).to have_content("image.png")
    end

    expect(issue.reload.files.count).to eq(1)
  end
end
