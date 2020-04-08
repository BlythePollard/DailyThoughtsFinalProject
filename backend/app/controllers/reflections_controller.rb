class ReflectionsController < ApplicationController
    def create
        @reflection = Reflection.create(content: params[:reflection], day_id: params[:day][:id])
        render json: @reflection
    end
end