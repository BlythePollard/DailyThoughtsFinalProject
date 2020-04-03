class UsersController < ApplicationController
   
    def create
        @user = User.find_by(name: params[:name])
        if @user
            session[:user_id] = @user.id
            render json: @user
        else 
            @user = User.new(user_params)
            if @user.save
                session[:user_id] = @user.id
                render json: @user
            end
        end
    end

    private

    def user_params
        params.require(:note).permit(:name)
    end
end