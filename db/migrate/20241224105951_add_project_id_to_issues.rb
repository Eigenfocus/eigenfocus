class AddProjectIdToIssues < ActiveRecord::Migration[8.0]
  def change
    add_reference :issues, :project, index: true, foreign_key: true
  end
end
