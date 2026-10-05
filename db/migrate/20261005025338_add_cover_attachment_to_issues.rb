class AddCoverAttachmentToIssues < ActiveRecord::Migration[8.1]
  def change
    add_reference :issues, :cover_attachment, foreign_key: { to_table: :active_storage_attachments, on_delete: :nullify }
  end
end
