class ChangeFavoriteThemeModel < ActiveRecord::Migration[8.0]
  def change
    add_column :user_preferences, :favorite_theme_key, :string
  end
end
