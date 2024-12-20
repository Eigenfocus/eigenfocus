class AddFavoriteThemeKeyToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :favorite_theme_key, :string
  end
end
