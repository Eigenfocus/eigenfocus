require 'rails_helper'

describe "Issue Comments" do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project) }
  let!(:issue) { FactoryBot.create(:issue, project: project) }

  specify "I can create a new comment on an issue" do
    visit project_issues_path(project)

    within dom_id(issue) do
      click_link('Go to issue')
    end

    within '.cpy-comments-container' do
      click_button 'Write a new comment'
    end

    within '#new_comment_form' do
      write_in_md_editor_field 'This is a new comment'
      click_button 'Save'
    end

    within '.cpy-comments-list' do
      expect(page).to have_content('This is a new comment')
    end
  end

  specify "I can edit an existing comment" do
    comment = FactoryBot.create(:issue_comment, issue: issue, content: 'This is a comment to be edited', author: user)
    visit project_issues_path(project)

    within dom_id(issue) do
      click_link('Go to issue')
    end

    within dom_id(comment) do
      click_link('Edit')
      write_in_md_editor_field 'comment updated'
      click_button 'Save'

      expect(page).to have_content('updated')
    end

    comment.reload
    expect(comment.content).to include('comment updated')
  end

  specify "I can delete an existing comment" do
    comment = FactoryBot.create(:issue_comment, issue: issue, content: 'This is a comment to be deleted', author: user)
    visit project_issues_path(project)

    within dom_id(issue) do
      click_link('Go to issue')
    end

    within dom_id(comment) do
      accept_confirm do
        click_link('Remove')
      end
    end

    expect(page).not_to have_content(comment.content)
    expect(Issue::Comment.count).to eq(0)
  end
end
