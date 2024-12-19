class CreateVisualizations < ActiveRecord::Migration[8.0]
  def change
    create_table :visualizations do |t|
      t.string :type, default: "board"
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
