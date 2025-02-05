class CreateIssueLabelsLinks < ActiveRecord::Migration[8.0]
  def change
    create_table :issue_label_links do |t|
      t.references :issue, foreign_key: true, null: false
      t.references :issue_label, foreign_key: true, null: false
      t.timestamps
    end

    add_index :issue_label_links, [ :issue_id, :issue_label_id ], unique: true
  end
end
