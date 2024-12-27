class AddPositioningConstraintOnGroupings < ActiveRecord::Migration[8.0]
  def change
    add_index :groupings, [ :visualization_id, :position ], unique: true
  end
end
