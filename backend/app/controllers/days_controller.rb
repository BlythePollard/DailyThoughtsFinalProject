class DaysController < ApplicationController
    def index
        @days = Day.all
        render json: @days, include: [:reflections, :observations]
    end

    def show
        @day = Day.find(params[:id])
        render json: @day, include: [:reflections, :observations]
    end

    def create
        @day = Day.create(date: params[:day])
        render json: @day
        # if current_user.days << @day
        #     render json: @day
        # else
        #     #render error
        # end
    end

    def update
        @day = Day.find(params[:id])
        if @day.update(day_params)
            render json: @day
        else 
            #render error
        end
    end

end