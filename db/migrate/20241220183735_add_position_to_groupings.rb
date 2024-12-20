class AddPositionToGroupings < ActiveRecord::Migration[8.0]
  def change
    add_column :groupings, :position, :integer, null: false
  end
end
