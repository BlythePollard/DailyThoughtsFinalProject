class ObservationsController < ApplicationController
    def create
        @observation = Observation.create(content: params[:observation], day_id: params[:day][:id])
        render json: @observation
    end

    def destroy
        observation = Observation.find_by(id: params[:id])
        observation.destroy
        render json: observation
    end

end