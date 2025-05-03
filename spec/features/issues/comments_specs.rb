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

    within '#new_comment_form' do
      fill_in 'issue_comment_content', with: 'This is a new comment'
      click_button 'Save'
    end

    within '.cpy-comments-list' do
      expect(page).to have_content('This is a new comment')
    end
  end

  specify "I can edit an existing comment" do
    comment = FactoryBot.create(:issue_comment, issue: issue, content: 'This is a comment to be edited')
    visit project_issues_path(project)

    within dom_id(issue) do
      click_link('Go to issue')
    end

    within dom_id(comment) do
      click_link('Edit')
      fill_in 'issue_comment_content', with: 'comment updated'
      click_button 'Save'

      expect(page).to have_content('comment updated')
    end

    comment.reload
    expect(comment.content).to eq('comment updated')
  end

  specify "I can delete an existing comment" do
    comment = FactoryBot.create(:issue_comment, issue: issue, content: 'This is a comment to be deleted')
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
