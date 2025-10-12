class ProfilesController < ApplicationController
  skip_before_action :ensure_user_profile_is_complete

  def edit
  end

  def update
    was_first_update = !current_user.is_profile_complete?
    if current_user.update(user_params)
      I18n.locale = current_user.locale

      if was_first_update
        ExampleProjectCreator.(current_user)
      end

      flash[:success] = t(".success")
      redirect_to projects_path(mark_app_tours_as_pending: was_first_update)
    else
      flash[:alert] = current_user.errors.full_messages.to_sentence
      redirect_to edit_profile_path
    end
  end

  def update_preferences
    if params[:time_entry_time_format].present?
      current_user.preferences.time_entry_time_format = params[:time_entry_time_format]
      current_user.preferences.save!
    end

    if params[:favorite_theme_key].present?
      current_user.favorite_theme_key = params[:favorite_theme_key]
      current_user.save!
    end

    head :ok
  end

  def user_params
    params.require(:profile).permit(:timezone, :locale)
  end
end
