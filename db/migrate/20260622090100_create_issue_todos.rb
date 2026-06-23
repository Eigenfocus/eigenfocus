class CreateIssueTodos < ActiveRecord::Migration[8.0]
  def change
    create_table :issue_todos do |t|
      t.string :description
      t.references :todo_list, null: false, foreign_key: { to_table: :issue_todo_lists }
      t.datetime :finished_at
      t.references :finished_by, null: true, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
