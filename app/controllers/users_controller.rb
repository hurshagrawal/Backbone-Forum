class UsersController < ApplicationController
	respond_to :json

	# GET /users.json
	def index
		@users = User.all
		respond_with "db", @users
	end

	# GET /users/1.json
	def show
		@user = User.find(params[:id])
		respond_with "db", @user
	end

	# GET /users/new.json
	def new
		@user = User.new
		respond_with "db", @user
	end

	# POST /users.json
	def create
		unless User.where(:username => params['username']).size == 0
			respond_to { |format| format.json { render :json => {:exists => true} } }
			return
		end

		@user = User.new :username => params['username'], :password => params['password']

		if @user.save
			session[:user_id] = @user.id
			respond_with "db", @user
		else
			respond_with "db", @user, :status => :unprocessable_entity
		end
	end

	# PUT /users/1.json
	def update
		@user = User.find(params[:id])

		if @user.update_attributes(params[:user])
			respond_with "db", @user
		else
			respond_with "db", @user, :status => :unprocessable_entity
		end
	end

	# DELETE /users/1.json
	def destroy
		@user = User.find(params[:id])
		@user.destroy

		respond_with { head :ok }
	end
end
