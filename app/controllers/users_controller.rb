class UsersController < ApplicationController

  def edit
  end
  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end
  def show
    @user = User.find(params[:id])
    respond_to do |format|
      format.html
      format.json
    end
  end
  def search
    @users = User.where.not(id: params[:ids])
    @users = @users.where('name LIKE(?)', "%#{params[:keyword]}%")
    respond_to do |format|
      format.html
      format.json
    end
  end
  private
  def user_params
    params.require(:user).permit(:name,:email)
  end
end
