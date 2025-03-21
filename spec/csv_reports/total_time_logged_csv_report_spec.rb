require 'rails_helper'

describe TotalTimeLoggedCsvReport do
  let(:project_1) { create(:project, name: "Project 1") }
  let(:project_2) { create(:project, name: "Project 2") }

  let(:time_entries) {
    [
      create(:time_entry, reference_date: Date.current, project: project_1, issue: create(:issue, with_labels: [ "Development", "Sign Up" ], title: "Issue 1", project: project_1), description: "Description 1", total_logged_time_in_minutes: 10),
      create(:time_entry, reference_date: Date.current, project: project_1, description: "Description 2", total_logged_time_in_minutes: 15),
      create(:time_entry, reference_date: Date.current, project: project_2, issue: create(:issue, with_labels: [ "Design" ], title: "Issue 2", project: project_2), description: "Description 3", total_logged_time_in_minutes: 5)
    ]
  }
  let(:total_time_hours) { 30 }

  subject { described_class.new(time_entries, total_time_hours) }

  def match_time_entry_row(row, time_entry)
    expect(row[0]).to eq(time_entry.reference_date.strftime("%Y-%m-%d"))
    expect(row[1]).to eq(time_entry.project.name)
    expect(row[2]).to eq(time_entry.issue&.title)
    expect(row[3]).to eq(time_entry.description)
    expect(row[4]).to eq(time_entry.issue&.labels&.map(&:title)&.join(" | "))
    expect(row[5]).to eq(time_entry.total_logged_time_in_minutes.to_s)
  end

  specify '#generate_csv' do
    csv = subject.generate_csv

    report = CSV.parse(csv, col_sep: "\t")

    expect(report.size).to eq(5)
    expect(report[0][0]).to eq("Total: ")
    expect(report[0][1]).to eq("30 Hours")
    expect(report[1]).to eq([ "Date", "Project", "Issue", "Description", "Labels", "Logged time (minutes)" ])

    match_time_entry_row(report[2], time_entries[0])
    match_time_entry_row(report[3], time_entries[1])
    match_time_entry_row(report[4], time_entries[2])
  end
end
