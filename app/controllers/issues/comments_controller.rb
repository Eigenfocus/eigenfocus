module Issues
  class CommentsController < ApplicationController
    def create
      @comment = current_issue.comments.new(comment_params)

      @comment.save
    end

    def edit
      @comment = current_issue.comments.find(params[:id])
    end

    def update
      @comment = current_issue.comments.find(params[:id])
      @comment.update(comment_params)
    end

    def destroy
      @comment = current_issue.comments.find(params[:id])
      @comment.destroy
    end

    private

    def current_issue
      @current_issue ||= Issue.find(params[:issue_id])
    end

    def comment_params
      params.require(:issue_comment).permit(:content)
    end
  end
end
