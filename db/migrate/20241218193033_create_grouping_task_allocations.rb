class CreateGroupingTaskAllocations < ActiveRecord::Migration[8.0]
  def change
    create_table :grouping_task_allocations do |t|
      t.integer :position
      t.references :task, null: false, foreign_key: true
      t.references :grouping, null: false, foreign_key: true

      t.timestamps
    end
  end
end
