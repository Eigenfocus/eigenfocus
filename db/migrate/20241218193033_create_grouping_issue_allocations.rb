class CreateGroupingIssueAllocations < ActiveRecord::Migration[8.0]
  def change
    create_table :grouping_issue_allocations do |t|
      t.integer :position, null: false
      t.references :issue, null: false, foreign_key: true
      t.references :grouping, null: false, foreign_key: true

      t.timestamps
    end
  end
end
