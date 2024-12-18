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

  specify "when I create one, a visualization is also created" do
    visit projects_path

    click_link "Create project"
    fill_in :project_name, with: "Alpine"
    click_button "Create"

    expect(page).to have_content("Alpine")
    expect(Project.count).to eq(1)
    expect(Project.last.visualizations.count).to eq(1)
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

  specify "I can enable for time tracking" do
    project_to_enable = FactoryBot.create(:project, time_tracking_enabled: false)
    visit projects_path

    within "#project_#{project_to_enable.id}" do
      click_button "Disable time tracking"
      click_link "Enable time tracking"
    end

    expect(page).to have_content("Project was successfully updated.")

    project_to_enable.reload
    expect(project_to_enable).to be_time_tracking_enabled
  end


  specify "I can disable for time tracking" do
    project_to_disable = FactoryBot.create(:project, time_tracking_enabled: true)
    visit projects_path

    within "#project_#{project_to_disable.id}" do
      click_button "Enable time tracking"
      click_link "Disable time tracking"
    end

    expect(page).to have_content("Project was successfully updated.")

    project_to_disable.reload
    expect(project_to_disable).to_not be_time_tracking_enabled
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

  specify "I can go to the project visualization" do
    project = FactoryBot.create(:project)

    visit projects_path

    within dom_id(project) do
      expect(page).to have_content("Go to Board")

      click_link("Go to Board")
    end

    expect(page).to have_content("Board")
  end
end
