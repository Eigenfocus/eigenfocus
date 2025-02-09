Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  mount ActionCable.server => "/cable"

  resources :projects, except: [ :destroy ] do
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

  get "v/:id/i/:issue_id",
      as: :show_visualization_issue,
      controller: :visualizations,
      action: :show

  resources :visualizations, path: "v", only: :show do
    scope module: :visualizations do
      resources :groupings, only: [ :new, :create, :edit, :update, :destroy ] do
        collection do
          post :move
        end
      end

      resources :issues, path: "i", only: [ :create, :update, :destroy ]
    end
  end


  resources :projects, path: "p", only: [] do
    scope module: :projects do
      resources :issue_labels do
        member do
          get :destroy_confirmation
        end
      end

      resources :issues, only: [ :index ] do
        member do
          post :add_label
          delete :remove_label
        end
      end
    end
  end

  scope module: :visualizations do
    resources :allocations, only: [] do
      post :move, on: :collection
    end
  end

  resources :issues, only: [] do
    scope module: "issues" do
      resource :file, only: [ :destroy ] do
        post :attach, on: :collection
      end
    end
  end

  resource :profile, only: [ :edit, :update ]

  # Defines the root path route ("/")
  root "projects#index"
end
