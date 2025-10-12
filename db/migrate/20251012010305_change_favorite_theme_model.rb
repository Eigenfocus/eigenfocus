class ChangeFavoriteThemeModel < ActiveRecord::Migration[8.0]
  def change
    remove_column :users, :favorite_theme_key
    add_column :user_preferences, :favorite_theme_key, :string
  end
end
