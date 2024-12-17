class ProfilesController < ApplicationController
  skip_before_action :ensure_user_profile_is_complete

  def edit
  end

  def update
    if current_user.update(user_params)
      I18n.locale = current_user.locale
      flash[:success] = t(".success")
      redirect_to root_path
    else
      flash[:alert] = current_user.errors.full_messages.to_sentence
      redirect_to edit_profile_path
    end
  end

  def user_params
    params.require(:profile).permit(:timezone, :locale)
  end

  def resend_confirmation
    unless current_user.confirmed?
      current_user.send_confirmation_instructions
    end
  end
end
