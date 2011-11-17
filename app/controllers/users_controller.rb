class UsersController < ApplicationController
	respond_to :json

	# GET /users.json
	def index
		@users = User.all
		respond_with @users
	end

	# GET /users/1.json
	def show
		@user = User.find(params[:id])
		respond_with @user
	end

	# GET /users/new.json
	def new
		@user = User.new
		respond_with @user
	end

	# GET /users/1/edit
	def edit
		@user = User.find(params[:id])
	end

	# POST /users.json
	def create
		@user = User.new(params[:user])

		if @user.save
			respond_with @user
		else
			respond_with @user, :status => :unprocessable_entity
		end
	end

	# PUT /users/1.json
	def update
		@user = User.find(params[:id])

		if @user.update_attributes(params[:user])
			respond_with @user
		else
			respond_with @user, :status => :unprocessable_entity
		end
	end

	# DELETE /users/1.json
	def destroy
		@user = User.find(params[:id])
		@user.destroy

		respond_width { head :ok }
	end
end
