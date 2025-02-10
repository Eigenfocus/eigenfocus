module MarkdownEditorHelper
  def write_in_md_editor_field(text)
    within ".CodeMirror" do
      # Click makes CodeMirror element active:
      current_scope.click

      # Find the hidden textarea:
      field = current_scope.find("textarea", visible: false)

      # Mimic user typing the text:
      field.send_keys text
    end
  end

  def markdown_editor_selector
    ".CodeMirror-code"
  end

end

RSpec.configure do |config|
  config.include MarkdownEditorHelper, type: :feature
end
