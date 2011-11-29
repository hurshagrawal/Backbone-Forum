class StaticsController < ApplicationController

	def index
		@posts = get_post_json
		@rooms = get_room_json

		@current_user_json = @current_user ? ActiveSupport::JSON.encode(@current_user) : '{}'

		render 'index', :layout => false
	end

	private

	def get_post_json
		hash_arr = Post.all.map { |p| p.attributes.merge({:username => p.user.username}) }
		return ActiveSupport::JSON.encode hash_arr
	end

	def get_room_json
		hash_arr = Room.all.map do |r|
			r.attributes.merge :username => r.user.username, :participants => r.participants
		end

		return ActiveSupport::JSON.encode hash_arr
	end
end
