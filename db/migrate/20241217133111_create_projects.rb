class CreateProjects < ActiveRecord::Migration[8.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.datetime :archived_at
      t.boolean :time_tracking_enabled, default: true, null: false
      t.timestamps
    end
  end
end
