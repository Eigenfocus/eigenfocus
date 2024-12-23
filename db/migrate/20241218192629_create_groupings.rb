class CreateGroupings < ActiveRecord::Migration[8.0]
  def change
    create_table :groupings do |t|
      t.string :title
      t.references :visualization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
