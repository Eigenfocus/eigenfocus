Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  mount ActionCable.server => "/cable"

  resources :projects do
    member do
      put :archive
      put :unarchive
    end
  end

  resources :time_entries do
    get :form_projects_dependent_fields, on: :collection

    member do
      put :start
      put :stop
    end
  end

  resource :reports, only: [] do
    get :total_time
  end

  resources :survey_responses, only: [ :create ]

  get "v/:id/i/:issue_id",
      as: :show_visualization_issue,
      controller: :visualizations,
      action: :show

  resources :visualizations, path: "v", only: [ :show, :update ] do
    scope module: :visualizations do
      resources :groupings, only: [ :new, :create, :edit, :update, :destroy ] do
        member do
          get :move_all_issues
          post :move_all_issues_to
          post :archive_all_issues
        end
        collection do
          post :move
        end
      end

      resources :issues, path: "i", only: [ :create, :update, :destroy ]
      resources :allocations, only: [] do
        post :move, on: :collection
      end
    end
  end


  resources :projects, path: "p", only: [] do
    scope module: :projects do
      resources :issue_labels do
        member do
          get :destroy_confirmation
        end
      end

      resources :issues, only: [ :index, :new, :create, :update, :destroy ] do
        member do
          post :add_label
          delete :remove_label
        end
      end

      get "i/:id",
          as: :show_issue,
          controller: :issues,
          action: :index
    end
  end

  resources :issues, only: [ :destroy ] do
    member do
      patch :update_description
      patch :pick_grouping
      put :archive
      put :unarchive
    end
    scope module: "issues" do
      resource :file, only: [ :destroy ] do
        post :attach, on: :collection
      end
      resources :comments, only: [ :create, :edit, :update, :destroy ]
    end
  end

  resource :profile, only: [ :edit, :update ]

  resources :notifications, only: [] do
    member do
      post :mark_as_read
    end
    collection do
      post :mark_all_as_read
    end
  end

  # Defines the root path route ("/")
  root "projects#index"
end
