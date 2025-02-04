class CreateIssueLabels < ActiveRecord::Migration[8.0]
  def change
    create_table :issue_labels do |t|
      t.string :title, null: false, index: true
      t.string :color, null: false
      t.timestamps
    end
  end
end
