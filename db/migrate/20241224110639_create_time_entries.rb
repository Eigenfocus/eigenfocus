class CreateTimeEntries < ActiveRecord::Migration[8.0]
  def change
    create_table :time_entries do |t|
      t.references :project, foreign_key: true
      t.references :user, foreign_key: true
      t.string "description", default: ""
      t.integer "total_logged_time_in_minutes", default: 0, null: false
      t.datetime "started_at"
      t.date "reference_date"
      t.timestamps
    end
  end
end
