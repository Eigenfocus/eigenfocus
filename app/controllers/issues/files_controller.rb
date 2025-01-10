class Issues::FilesController < ApplicationController

  def attach
    issue.files.attach(params[:blob_signed_id])
  end

  private def issue
    @issue ||= Issue.find(params[:issue_id])
  end
end
