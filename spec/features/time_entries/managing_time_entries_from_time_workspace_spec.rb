require 'rails_helper'

context "As a user, I want to manage my time entries" do
  let!(:user) { FactoryBot.create(:user) }

  around(:example) do |ex|
    Timecop.freeze("2023-07-13 12:00".to_datetime) do
      ex.run
    end
  end

  let(:user) { FactoryBot.create(:user) }

  specify "If there is none, I should see a message" do
    visit time_entries_path

    expect(page).to have_content("There are no time entry for July 13, 2023.")
  end

  specify "I can list them" do
    other_user_entry = FactoryBot.create(:time_entry, description: 'other entry', reference_date: Date.current)

    yesterday_entry = FactoryBot.create(:time_entry, user:, description: 'yt entry', reference_date: 1.day.ago)
    today_entry1 = FactoryBot.create(:time_entry, user:, description: 'td entry', reference_date: Date.current)
    project_issue = today_entry1.project.issues.create!(title: "Special issue")
    today_entry1.issue = project_issue

    today_entry1.save!
    today_entry2 = FactoryBot.create(:time_entry, user:, total_logged_time_in_minutes: 110, description: 'td entry2', reference_date: Date.current)

    visit time_entries_path

    expect(page).to have_content('td entry')
    expect(page).to have_content('Special issue')
    expect(page).to have_content('td entry2')
    expect(page).to have_content('01:50')
    expect(page).to_not have_content('other entry')

    expect(page).to_not have_content('yt entry')

    find('a[data-reference-date="2023-07-12"]').click

    expect(page).to_not have_content('td entry')
    expect(page).to_not have_content('td entry2')
    expect(page).to have_content('yt entry')
  end

  specify "I can create one - no auto start" do
    project = Project.create!(name: 'One project')
    issue = project.issues.create(title: "Special issue")

    Project.create!(name: 'Other project')

    visit time_entries_path

    first(:link, "Add time entry").click

    fill_in :time_entry_description, with: "new description"
    fill_in :time_entry_total_logged_time, with: "20"
    select_from_multi_select(label_for: 'time_entry_project_id', option_text: "One project")
    select_from_multi_select(selector: '#project_dependent_fields', option_text: "Special issue")

    click_button "Create"

    expect(page).to have_content("Time entry was successfully created.")

    time_entry = TimeEntry.last
    expect(time_entry.total_logged_time_in_minutes).to eq(20)
    expect(time_entry.description).to eq("new description")
    expect(time_entry.issue).to eq(issue)
    expect(time_entry.project).to eq(project)
    expect(time_entry).to_not be_running
  end

  specify "I can create one - with auto start" do
    project = Project.create!(name: 'One project')
    issue = project.issues.create(title: "Special issue")

    Project.create!(name: 'Other project')

    visit time_entries_path

    first(:link, "Add time entry").click

    fill_in :time_entry_description, with: "new description"
    select_from_multi_select(label_for: 'time_entry_project_id', option_text: "One project")
    select_from_multi_select(selector: '#project_dependent_fields', option_text: "Special issue")

    click_button "Create"

    expect(page).to have_content("Time entry was successfully created.")

    time_entry = TimeEntry.last
    expect(time_entry.description).to eq("new description")
    expect(time_entry.issue).to eq(issue)
    expect(time_entry.project).to eq(project)
    expect(time_entry).to be_running
    within "#header_running_time_entries" do
      expect(page).to have_content("1 timer running")
    end
  end

  specify "I can update a time entry that has an issue" do
    project = Project.create!(name: 'New project')
    issue = project.issues.create(title: "issue")
    new_issue = project.issues.create(title: "New issue")
    time_entry = FactoryBot.create(:time_entry, user:, project:, issue:, description: 'td entry', reference_date: Date.current)

    visit time_entries_path

    within "#time_entry_#{time_entry.id}" do
      click_link "Edit"
    end

    fill_in :time_entry_description, with: "Edited description"
    fill_in :time_entry_total_logged_time, with: "45"
    select_from_multi_select(label_for: 'time_entry_project_id', option_text: "New project")
    select_from_multi_select(selector: '#project_dependent_fields', option_text: "New issue")

    click_button "Update"

    expect(page).to have_content("Time entry was successfully updated.")

    time_entry.reload
    expect(time_entry.total_logged_time_in_minutes).to eq(45)
    expect(time_entry.description).to eq("Edited description")
    expect(time_entry.project).to eq(project)
    expect(time_entry.issue).to eq(new_issue)
  end

  specify "I can update a time entry that has no issue" do
    project = Project.create!(name: 'New project')
    new_issue = project.issues.create(title: "New issue")
    time_entry = FactoryBot.create(:time_entry, user:, project:, description: 'td entry', reference_date: Date.current)

    visit time_entries_path

    within "#time_entry_#{time_entry.id}" do
      click_link "Edit"
    end

    fill_in :time_entry_description, with: "Edited description"
    fill_in :time_entry_total_logged_time, with: "45"
    select_from_multi_select(label_for: 'time_entry_project_id', option_text: "New project")
    select_from_multi_select(selector: '#project_dependent_fields', option_text: "New issue")

    click_button "Update"

    expect(page).to have_content("Time entry was successfully updated.")

    time_entry.reload
    expect(time_entry.total_logged_time_in_minutes).to eq(45)
    expect(time_entry.description).to eq("Edited description")
    expect(time_entry.project).to eq(project)
    expect(time_entry.issue).to eq(new_issue)
  end

  specify "I can remove" do
    keep_entry = FactoryBot.create(:time_entry, user:, description: 'keep entry', reference_date: Date.current)
    remove_entry = FactoryBot.create(:time_entry, user:, description: 'to remove entry', reference_date: Date.current, started_at: 1.hour.ago)

    visit time_entries_path

    expect(TimeEntry.count).to eq(2)
    expect(page).to have_content("keep entry")
    expect(page).to have_content("to remove entry")

    page.accept_alert do
      within "#time_entry_#{remove_entry.id}" do
        click_link "Remove"
      end
    end
    expect(page).to have_content("keep entry")
    expect(page).to_not have_content("to remove entry")

    expect(TimeEntry.count).to eq(1)
    expect(TimeEntry.where(id: remove_entry.id).exists?).to eq(false)
    expect(page).to_not have_selector("#header_running_time_entries")
  end

  specify "I can start time log" do
    time_entry = FactoryBot.create(:time_entry, user:,  reference_date: Date.current)

    visit time_entries_path

    expect(time_entry).to_not be_running

    within "#time_entry_#{time_entry.id}" do
      click_link "Start"
      expect(page).to have_content("Stop")
    end

    time_entry.reload

    expect(time_entry).to be_running
  end

  specify "I can stop time log" do
    time_entry = FactoryBot.create(:time_entry, user:,  reference_date: Date.current)
    time_entry.total_logged_time_in_minutes = 20
    time_entry.start!
    time_entry.reload
    expect(time_entry).to be_running

    Timecop.travel(50.minutes.from_now) do
      visit time_entries_path
      within "#time_entry_#{time_entry.id}" do
        click_link "Stop"
        expect(page).to have_content("Start")
      end

      time_entry.reload

      expect(time_entry.total_logged_time_in_minutes).to eq(70)
      expect(time_entry).to_not be_running
    end
  end

  describe "Header running time entries information" do
    before do
      @time_entry = FactoryBot.create(:time_entry, user:, description: 'entry', reference_date: Date.current, started_at: 1.hour.ago)
      @time_entry2 = FactoryBot.create(:time_entry, user:, description: 'entry2', reference_date: 4.days.ago, started_at: 4.days.ago)
    end

    specify "Counting running time entries" do
      visit time_entries_path

      within "#header_running_time_entries" do
        expect(page).to have_content("2 timers running")
      end
    end

    specify "Updating count when running time entries changes" do
      visit time_entries_path

      within "#time_entry_#{@time_entry.id}" do
        click_link "Stop"
      end

      within "#header_running_time_entries" do
        expect(page).to have_content("1 timer running")
      end

      within "#time_entry_#{@time_entry.id}" do
        click_link "Start"
      end

      within "#header_running_time_entries" do
        expect(page).to have_content("2 timers running")
      end

      page.accept_alert do
        within "#time_entry_#{@time_entry.id}" do
          click_link "Remove"
        end
      end

      within "#header_running_time_entries" do
        expect(page).to have_content("1 timer running")
      end
    end
  end
end
