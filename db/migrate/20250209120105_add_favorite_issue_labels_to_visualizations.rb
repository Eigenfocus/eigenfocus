class AddFavoriteIssueLabelsToVisualizations < ActiveRecord::Migration[8.0]
  def change
    add_column :visualizations, :favorite_issue_labels, :json, null: false, default: []
  end
end
