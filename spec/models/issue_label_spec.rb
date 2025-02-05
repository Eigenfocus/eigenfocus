require 'rails_helper'

describe IssueLabel do
  describe '#title' do
    it 'strips on validate' do
      label = described_class.new(title: '   Important   ')
      label.valid?

      expect(label.title).to eq('Important')
    end
  end
end
