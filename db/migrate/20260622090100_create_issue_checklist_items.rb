class CreateIssueChecklistItems < ActiveRecord::Migration[8.0]
  def change
    create_table :issue_checklist_items do |t|
      t.string :description
      t.references :checklist, null: false, foreign_key: { to_table: :issue_checklists }
      t.integer :position, null: false
      t.datetime :finished_at
      t.references :finished_by, null: true, foreign_key: { to_table: :users }

      t.timestamps
    end

    add_index :issue_checklist_items, [ :checklist_id, :position ], unique: true
  end
end
