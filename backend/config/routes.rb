Rails.application.routes.draw do
  resources :users
  resources :days
  resources :observations
  resources :reflections
end
