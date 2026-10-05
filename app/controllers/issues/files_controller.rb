class Issues::FilesController < ApplicationController
  def attach
    @blob = UploadedBlob.find(params[:blob_signed_id])
    issue.files.attach(@blob)
  end

  def destroy
    @blob = ActiveStorage::Blob.find_signed(params[:blob_signed_id])
    attachment = issue.files.attachments.find_by(blob: @blob)
    attachment.purge
  end

  private def issue
    @issue ||= Issue.find(params[:issue_id])
  end
end
