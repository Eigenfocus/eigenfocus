Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

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

  resources :visualizations, only: :show do
    resources :groupings, only: [ :new, :create, :edit, :update ] do
      collection do
        post :move
      end
    end
  end

  resource :profile, only: [ :edit, :update ]

  # Defines the root path route ("/")
  root "projects#index"
end
