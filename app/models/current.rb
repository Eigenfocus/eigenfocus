class Current
  def self.user
    User.first_or_create
  end

  def self.theme_key
    user.preferences.favorite_theme_key
  end
end
