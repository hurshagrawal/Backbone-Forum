class RoomsController < ApplicationController
	respond_to :json

	# GET /rooms.json
	def index
		respond_to { |format| format.json { render :json => rooms_json } }
	end

	# GET /rooms/1.json
	def show
		@room = Room.find(params[:id])
		respond_to { |format| format.json { render :json => room_json(@room) } }
	end

	# GET /rooms/new.json
	def new
		@room = Room.new
		respond_with "db", @room
	end

	# POST /rooms.json
	def create
		@room = Room.new(params[:room])

		if @room.save
			respond_to { |format| format.json { render :json => room_json(@room) } }
		else
			respond_with "db", @room, :status => :unprocessable_entity
		end
	end

	# PUT /rooms/1.json
	def update
		@room = Room.find(params[:id])

		if @room.update_attributes(params[:room])
			respond_to { |format| format.json { render :json => room_json(@room) } }
		else
			respond_with "db", @room, :status => :unprocessable_entity
		end
	end

	# DELETE /rooms/1.json
	def destroy
		@room = Room.find(params[:id])
		@room.destroy

		respond_width { head :ok }
	end

	private

	def room_json(room)
		return room.attributes.merge({:username => room.user.username,
																	:participants => room.participants})
	end

	def rooms_json
		hash_arr = Room.all.map do |r|
			r.attributes.merge :username => r.user.username, :participants => r.participants
		end

		return ActiveSupport::JSON.encode hash_arr
	end
end
