class AddFinishedAtToIssues < ActiveRecord::Migration[8.0]
  def change
    add_column :issues, :finished_at, :datetime
  end
end
