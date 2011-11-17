class RoomsController < ApplicationController
	respond_to :json

	# GET /rooms.json
	def index
		@rooms = Room.all
		respond_with @rooms
	end

	# GET /rooms/1.json
	def show
		@room = Room.find(params[:id])
		respond_with @room
	end

	# GET /rooms/new.json
	def new
		@room = Room.new
		respond_with @room
	end

	# GET /rooms/1/edit
	def edit
		@room = Room.find(params[:id])
	end

	# POST /rooms.json
	def create
		@room = Room.new(params[:room])

		if @room.save
			respond_with @room
		else
			respond_with @room, :status => :unprocessable_entity
		end
	end

	# PUT /rooms/1.json
	def update
		@room = Room.find(params[:id])

		if @room.update_attributes(params[:room])
			respond_with @room
		else
			respond_with @room, :status => :unprocessable_entity
		end
	end

	# DELETE /rooms/1.json
	def destroy
		@room = Room.find(params[:id])
		@room.destroy

		respond_width { head :ok }
	end
end
