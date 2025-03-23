module MarkdownEditorHelper
  def write_in_md_editor_field(text)
    within markdown_editor_selector do
      current_scope.send_keys text
      sleep(0.5)
    end
  end

  def markdown_editor_selector
    ".ProseMirror"
  end
end

RSpec.configure do |config|
  config.include MarkdownEditorHelper, type: :feature
end
