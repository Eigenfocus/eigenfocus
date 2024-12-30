class AddConstraintOnGroupingIssueAllocations < ActiveRecord::Migration[8.0]
  def change
    add_index :grouping_issue_allocations, [ :grouping_id, :position ], unique: true
  end
end
