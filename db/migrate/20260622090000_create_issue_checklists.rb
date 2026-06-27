class CreateIssueChecklists < ActiveRecord::Migration[8.0]
  def change
    create_table :issue_checklists do |t|
      t.string :title, null: false
      t.references :issue, null: false, foreign_key: true

      t.timestamps
    end
  end
end
