class AddArchivedAtToIssues < ActiveRecord::Migration[8.0]
  def change
    add_column :issues, :archived_at, :datetime
    add_index :issues, :archived_at
  end
end
