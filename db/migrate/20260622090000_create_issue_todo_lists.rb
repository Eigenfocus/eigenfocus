class CreateIssueTodoLists < ActiveRecord::Migration[8.0]
  def change
    create_table :issue_todo_lists do |t|
      t.string :title, null: false
      t.references :issue, null: false, foreign_key: true

      t.timestamps
    end
  end
end
