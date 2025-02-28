class CreateNotifications < ActiveRecord::Migration[8.0]
  def change
    create_table :notifications do |t|
      t.string :title, null: false
      t.text :content
      t.json :announcement_modes, null: false, default: []
      t.string :external_id
      t.datetime :read_at
      t.datetime :published_at

      t.timestamps
    end
  end
end
