require 'rails_helper'

describe "Issues - Cover", :disable_in_pro_edition do
  let!(:user) { create(:user) }
  let!(:project) { create(:project) }
  let!(:column) { create(:grouping, visualization: project.default_visualization) }
  let!(:issue) { create(:issue, project:) }
  let(:image) { ActiveStorage::Blob.create_and_upload!(io: file_fixture("cover.png").open, filename: "cover.png") }

  before { column.allocate_issue(issue) }

  def visit_issue
    visit show_visualization_issue_path(project.default_visualization, issue)
  end

  specify "I can upload an image as the issue cover" do
    visit visualization_path(project.default_visualization)
    find(dom_id(issue)).click

    within(".cpy-issue-detail") do
      find(".cpy-cover-button").click
      attach_file(file_fixture("cover.png")) { find(".cpy-cover-upload").click }

      expect(page).to have_css(".cpy-issue-cover")
      expect(page).to have_css("#issue-#{issue.id}-file-list", text: "cover.png")
    end

    within(dom_id(issue)) do
      expect(page).to have_css(".cpy-card-cover img")
    end

    expect(issue.reload.cover_attachment.filename.to_s).to eq("cover.png")
  end

  specify "the board card shows the issue cover" do
    issue.cover_with_upload(image)

    visit visualization_path(project.default_visualization)

    within(dom_id(issue)) do
      expect(page).to have_css(".cpy-card-cover img")
    end
  end

  specify "removing the cover removes it from the board card" do
    issue.cover_with_upload(image)

    visit visualization_path(project.default_visualization)
    find(dom_id(issue)).click

    within(".cpy-issue-detail") do
      find(".cpy-cover-button").click
      find(".cpy-remove-cover").click
    end

    within(dom_id(issue)) do
      expect(page).not_to have_css(".cpy-card-cover")
    end
  end

  specify "uploading an image through the files area does not set it as cover" do
    visit_issue

    within(".cpy-issue-detail") do
      attach_file(file_fixture("cover.png")) { find(".dz-message").click }

      expect(page).to have_css("#issue-#{issue.id}-file-list", text: "cover.png")
      expect(page).not_to have_css(".cpy-issue-cover")
    end

    expect(issue.reload.files.count).to eq(1)
    expect(issue.cover_attachment).to be_nil
  end

  specify "uploading a file that can't be used as cover shows an error" do
    visit_issue

    within(".cpy-issue-detail") do
      find(".cpy-cover-button").click
      attach_file(file_fixture("cover.svg")) { find(".cpy-cover-upload").click }
    end

    expect(page).to have_content("The cover must be an image.")
    expect(issue.reload.files).to be_empty
  end

  specify "I can pick an attached image as the issue cover" do
    issue.files.attach(image)

    visit_issue

    within(".cpy-issue-detail") do
      find(".cpy-cover-button").click
      find(".cpy-cover-option").click

      expect(page).to have_css(".cpy-issue-cover")
    end

    expect(issue.reload.cover_attachment.blob).to eq(image)
  end

  specify "I can remove the issue cover and keep the file" do
    issue.cover_with_upload(image)

    visit_issue

    within(".cpy-issue-detail") do
      find(".cpy-cover-button").click
      find(".cpy-remove-cover").click

      expect(page).not_to have_css(".cpy-issue-cover")
    end

    expect(issue.reload.cover_attachment).to be_nil
    expect(issue.files.count).to eq(1)
  end

  specify "deleting the cover file removes the cover" do
    issue.cover_with_upload(image)

    visit_issue

    within(".cpy-issue-detail") do
      accept_confirm { find("[id='issue-file-#{image.signed_id}'] .btn-error").click }

      expect(page).not_to have_css(".cpy-issue-cover")
    end

    expect(issue.reload.cover_attachment).to be_nil
  end
end
