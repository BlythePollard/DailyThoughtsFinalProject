class ReflectionsController < ApplicationController
    def create
        @reflection = Reflection.create(content: params[:reflection], day_id: params[:day][:id])
        render json: @reflection
    end

    def destroy
        reflection = Reflection.find_by(id: params[:id])
        reflection.destroy
        render json: reflection
    end
end