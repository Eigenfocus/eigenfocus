module I18nJS
  # Monkey patch I18nJS because they don't expose the filtering logic on
  # their v4 gem.
  # This assumes only one translation is declared on the i18n.yml, which
  # doesn't looks like a problem for us.
  def self.filtered_translations
    config = Glob::SymbolizeKeys.call(load_config_file("config/i18n.yml"))
    group = config[:translations].first

    filtered_translations = Glob.filter(translations, group[:patterns])
    filtered_translations =
      plugins.reduce(filtered_translations) do |buffer, plugin|
        if plugin.enabled?
          plugin.transform(translations: buffer)
        else
          buffer
        end
      end

    sort_hash(clean_hash(filtered_translations))
  end
end
