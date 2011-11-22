class SessionsController < ApplicationController
	respond_to :json

	# GET /sessions.json
	def index
	end

	# GET /sessions/1.json
	def show
	end

	# GET /sessions/new.json
	def new
	end

	# POST /sessions.json
	def create
		user = User.where(:username => params["username"], :password => params["password"])
		if user.empty?
			@session = { :exists => false }
		else
			session[:user_id] = user.first.id
			user = user.first.attributes
			user.delete "password"

			@session = { :exists => true, :user => user }
		end

		Rails.logger.info @session
		respond_to { |format| format.json { render :json => @session } }
	end

	# PUT /sessions/1.json
	def update
	end

	# DELETE /sessions/1.json
	def destroy
		reset_session
		respond_to { |format| format.json { render :json => {} } }
		return
	end
end
