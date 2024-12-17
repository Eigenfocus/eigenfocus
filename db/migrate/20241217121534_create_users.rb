class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string "locale", limit: 5
      t.string "timezone"
      t.timestamps
    end
  end
end
