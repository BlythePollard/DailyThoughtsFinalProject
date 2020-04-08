class ReflectionsController < ApplicationController
    def create
        @reflection = Reflection.create(content: params[:observation], day_id: params[:day][:id])
        render json: @reflection
    end
end