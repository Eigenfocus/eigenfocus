class CreateAppMetadata < ActiveRecord::Migration[8.0]
  def change
    create_table :app_metadata do |t|
      t.string :token
      t.string :last_released_version
      t.datetime :last_released_version_checked_at
    end
  end
end
