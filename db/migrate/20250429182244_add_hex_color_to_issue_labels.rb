class AddHexColorToIssueLabels < ActiveRecord::Migration[8.0]
  def change
    add_column :issue_labels, :hex_color, :string
  end
end
