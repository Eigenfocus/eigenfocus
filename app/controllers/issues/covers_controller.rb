class Issues::CoversController < ApplicationController
  def create
    @issue = current_issue
    blob = UploadedBlob.find(params[:blob_signed_id])

    unless @issue.cover_with_upload(blob)
      blob.purge_later if blob.attachments.none?
      render_turbo_alert_message(:error, t("flash.issues.cover.invalid_image"))
    end
  end

  def update
    @issue = current_issue

    unless @issue.cover_with(@issue.files_attachments.find(params[:attachment_id]))
      render_turbo_alert_message(:error, t("flash.issues.cover.invalid_image"))
    end
  end

  def destroy
    @issue = current_issue
    @issue.remove_cover
  end

  private
  def current_issue
    @current_issue ||= Issue.find(params[:issue_id])
  end
end
