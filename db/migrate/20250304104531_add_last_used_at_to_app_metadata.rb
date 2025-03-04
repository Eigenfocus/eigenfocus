class AddLastUsedAtToAppMetadata < ActiveRecord::Migration[8.0]
  def change
    add_column :app_metadata, :last_used_at, :datetime
  end
end
