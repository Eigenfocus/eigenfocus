class IssuesController < ApplicationController
  def destroy
    @issue = Issue.find(params[:id])
    @issue.destroy
  end
end
