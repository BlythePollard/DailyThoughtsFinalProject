class ObservationsController < ApplicationController
    def create
        @observation = Observation.create(content: params[:observation], day_id: params[:day][:id])
        render json: @observation
    end

end