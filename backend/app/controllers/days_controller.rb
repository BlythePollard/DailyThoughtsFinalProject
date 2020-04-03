class DaysController < ApplicationController
    def index
        @days = Day.all
        render json: @notes
    end

    def show
        @day = Day.find(params[:id])
    end

    def create
        @day = Day.new(note_params)
        if current_user.days << @day
            render json: @day
        else
            #render error
        end
    end

    def update
        @day = Day.find(params[:id])
        if @day.update(day_params)
            render json: @day
        else 
            #render error
        end
    end

    private

    def day_params
        params.require(:note).permit(:content, :user_id)
    end
end