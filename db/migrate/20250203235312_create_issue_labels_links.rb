class CreateIssueLabelsLinks < ActiveRecord::Migration[8.0]
  def change
    create_table :issue_labels_links do |t|
      t.references :issue, foreign_key: true, null: false
      t.references :issue_label, foreign_key: true, null: false
      t.timestamps
    end
  end
end
