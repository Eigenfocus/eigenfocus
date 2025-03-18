require 'rails_helper'

context "As a user, I want to manage my projects" do
  let!(:user) { FactoryBot.create(:user) }

  specify "If there are no project, I should see a message" do
    visit projects_path

    expect(page).to have_content("You haven't created any Project yet.")
  end

  specify "I can list them" do
    FactoryBot.create(:project, name: 'Project Alpha')
    FactoryBot.create(:project, name: 'Project Beta')

    visit projects_path

    expect(page).to have_content('Project Alpha')
    expect(page).to have_content('Project Beta')
  end

  specify "I can create a project using a template" do
    visit projects_path

    click_link "Create project"

    within "#project_form" do
      fill_in :project_name, with: "Alpine"
      find("label[for='template_bug_tracking']").click
      click_button "Create"
    end

    expect(page).to have_content("Project was successfully created.")

    created_project = Project.last
    expect(page).to have_current_path(project_issues_path(created_project))
    expect(created_project.visualizations.count).to eq(1)
    expect(created_project.visualizations.first.groupings.first.title).to eq("Reported")
    expect(created_project.issue_labels.count).to eq(6)
    expect(created_project.issues.count).to eq(3)
  end

  specify "I can create a blank project" do
    visit projects_path

    click_link "Create project"


    within "#project_form" do
      fill_in :project_name, with: "Alpine"
      find("label[for='template_none']").click
      click_button "Create"
    end

    expect(page).to have_content("Project was successfully created.")

    created_project = Project.last
    expect(page).to have_current_path(project_issues_path(created_project))
    expect(created_project.visualizations.count).to eq(1)
    expect(created_project.visualizations.first.groupings.count).to eq(0)
    expect(created_project.issue_labels.count).to eq(0)
    expect(created_project.issues.count).to eq(0)
  end

  specify "I can edit one" do
    project2 = FactoryBot.create(:project, name: "Previous name")

    visit projects_path

    within "#project_#{project2.id}" do
      click_link "Edit"
    end

    fill_in :project_name, with: "Edited name"
    click_button "Update"

    visit projects_path
    project2.reload
    expect(project2.name).to eq("Edited name")
  end

  specify "I can archive" do
    project_to_archive = FactoryBot.create(:project)


    visit projects_path

    within "#project_#{project_to_archive.id}" do
      page.accept_alert do
        click_link('Archive')
      end
    end


    within "#project_#{project_to_archive.id}" do
      expect(page).to have_content("Archived")
    end
    expect(page).to have_content("Project was successfully archived.")


    project_to_archive.reload
    expect(project_to_archive).to be_archived
  end


  specify "I can unarchive" do
    project_to_unarchive = FactoryBot.create(:project)
    project_to_unarchive.archive!
    project_to_unarchive.reload
    expect(project_to_unarchive).to be_archived

    visit projects_path

    within "#project_#{project_to_unarchive.id}" do
      page.accept_alert do
        click_link('Unarchive')
      end
    end


    within "#project_#{project_to_unarchive.id}" do
      expect(page).to_not have_content("Archived")
    end

    expect(page).to have_content("Project was successfully unarchived.")

    project_to_unarchive.reload
    expect(project_to_unarchive).to_not be_archived
  end

  specify "I can start a new time entry for a specific project" do
    project_alpha = FactoryBot.create :project
    project_beta = FactoryBot.create :project

    visit projects_path

    within dom_id(project_beta) do
      click_link "Go to time tracking"
    end

    within '#time_entry_form' do
      expect(page).to have_select(
        'time_entry_project_id',
        selected: project_beta.name
      )
    end

    expect(page).to have_current_path(time_entries_path(new_entry: { project_id: project_beta.id }))
  end
end
