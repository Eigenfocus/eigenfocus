class HexColorValidator < ActiveModel::EachValidator
  HEX = /^#(?:[0-9a-fA-F]{3}){1,2}$/

  def validate_each(record, attribute, value)
    return unless value.present?

    unless HEX.match?(value)
      record.errors.add attribute, (options[:message] || :invalid_hex_color)
    end
  end
end
