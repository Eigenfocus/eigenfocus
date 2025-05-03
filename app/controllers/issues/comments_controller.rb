module Issues
  class CommentsController < ApplicationController
    def create
      @comment = current_issue.comments.new(comment_params)

      if @comment.save
        render turbo_stream: [
          turbo_stream.append("issue-comments-list", partial: "issues/issue_detail/comments/comment", locals: { comment: @comment }),
          turbo_stream.update("new_comment_form", partial: "issues/issue_detail/comments/form", locals: { comment: Issue::Comment.new(issue: current_issue) })
        ]
      else
        render turbo_stream: turbo_stream.update("new_comment_form", partial: "issues/issue_detail/comments/form", locals: { comment: @comment })
      end
    end

    def edit
      @comment = current_issue.comments.find(params[:id])
      render turbo_stream: turbo_stream.update(@comment, partial: "issues/issue_detail/comments/form", locals: { comment: @comment })
    end

    def update
      @comment = current_issue.comments.find(params[:id])
      if @comment.update(comment_params)
        render turbo_stream: turbo_stream.replace(@comment, partial: "issues/issue_detail/comments/comment", locals: { comment: @comment })
      end
    end

    def destroy
      @comment = current_issue.comments.find(params[:id])
      if @comment.destroy
        render turbo_stream: turbo_stream.remove(@comment)
      end
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
