require 'rails_helper'

describe IssueLabel do

  describe '#color' do
    it 'strips on validate' do
      label = described_class.new(color: '   #aaa   ')
      label.valid?

      expect(label.color).to eq('#aaa')
    end
  end

  describe '#title' do
    it 'strips on validate' do
      label = described_class.new(title: '   Important   ')
      label.valid?

      expect(label.title).to eq('Important')
    end
  end

end
