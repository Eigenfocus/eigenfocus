class AddCollapsedToGroupings < ActiveRecord::Migration[8.0]
  def change
    add_column :groupings, :collapsed, :boolean, null: false, default: false
  end
end
