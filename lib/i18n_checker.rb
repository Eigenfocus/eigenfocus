require "yaml"
require "pathname"

class I18nChecker
  RAILS_FRAMEWORK_PREFIXES = %w[
    date.
    time.
    datetime.
    errors.
    number.
    helpers.select.
    helpers.submit.
    support.
  ].freeze

  def initialize(locales, root)
    @locales = locales
    @root = root
  end

  def run
    locales_dir = File.join(@root, "config/locales")
    locale_files = Dir.glob(File.join(locales_dir, "**/*.yml"))

    key_sources = build_key_sources(locale_files)
    keys_by_locale = {}
    @locales.each do |locale|
      keys_by_locale[locale] = flatten_keys(load_locale_keys(locale_files, locale))
    end

    missing_found = false

    @locales.each do |locale|
      other_locales = @locales - [ locale ]
      other_keys = other_locales.flat_map { |l| keys_by_locale[l] }.uniq
      locale_keys = keys_by_locale[locale]

      missing = (other_keys - locale_keys).reject { |key| rails_framework_key?(key) }
      present_count = locale_keys.size

      if missing.any?
        missing_found = true
        puts "\nMissing keys for '#{locale}' (#{missing.size}):"
        missing.sort.each do |key|
          source_files = key_sources[key] || []
          source_info = source_files.map { |f| relative_path(f) }.join(", ")
          puts "  ✗ #{key} (present in #{source_info})"
        end
      else
        puts "\nNo missing keys for '#{locale}'"
      end

      puts "  Total keys present: #{present_count}"
    end

    if missing_found
      puts "\nSome translations are missing!"
      exit 1
    else
      puts "\nAll translations are present."
    end
  end

  private

  def relative_path(file)
    file.sub("#{@root}/", "")
  end

  def rails_framework_key?(key)
    RAILS_FRAMEWORK_PREFIXES.any? { |prefix| key.start_with?(prefix) }
  end

  def build_key_sources(files)
    sources = {}
    files.each do |file|
      file_data = YAML.load_file(file, permitted_classes: [ Symbol ])
      next unless file_data

      file_locale = file_data.keys.first
      flat = flatten_keys(file_data[file_locale])
      flat.each do |key|
        sources[key] ||= []
        sources[key] << file unless sources[key].include?(file)
      end
    end
    sources
  end

  def load_locale_keys(files, locale)
    result = {}
    files.each do |file|
      file_data = YAML.load_file(file, permitted_classes: [ Symbol ])
      next unless file_data&.key?(locale)

      deep_merge!(result, file_data[locale])
    end
    result
  end

  def flatten_keys(hash, prefix = "")
    keys = []
    return keys unless hash.is_a?(Hash)

    hash.each do |key, value|
      full_key = prefix.empty? ? key.to_s : "#{prefix}.#{key}"
      if value.is_a?(Hash)
        keys.concat(flatten_keys(value, full_key))
      else
        keys << full_key
      end
    end
    keys
  end

  def deep_merge!(into, data)
    data.each do |key, value|
      if into[key].is_a?(Hash) && value.is_a?(Hash)
        deep_merge!(into[key], value)
      else
        into[key] = value
      end
    end
    into
  end
end
