require 'rails_helper'

describe IssueLabel do
  describe '#title' do
    it 'strips on validate' do
      label = described_class.new(title: '   Important   ')
      label.valid?

      expect(label.title).to eq('Important')
    end
  end

  describe '#hex_color' do
    it 'uses a default color when hex_color is not present' do
      label = described_class.new(title: 'Important', hex_color: nil)
      expect(label.hex_color).to eq('#464555')
    end
  end
end
