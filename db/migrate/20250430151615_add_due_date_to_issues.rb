class AddDueDateToIssues < ActiveRecord::Migration[8.0]
  def change
    add_column :issues, :due_date, :date
  end
end
