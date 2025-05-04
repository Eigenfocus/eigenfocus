class CreateIssueComments < ActiveRecord::Migration[8.0]
  def change
    create_table :issue_comments do |t|
      t.text :content
      t.references :issue, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
