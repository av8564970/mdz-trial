Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  SIMPLE_REST_ACTIONS = %i(index create show update destroy)

  namespace :api do
    resources :posts, only: SIMPLE_REST_ACTIONS
    resources :components, only: SIMPLE_REST_ACTIONS
  end
end
