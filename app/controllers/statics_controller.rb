class StaticsController < ApplicationController

	def index
		@posts = get_json Post.all
		@rooms = get_json Room.all

		@current_user_json = @current_user ? ActiveSupport::JSON.encode(@current_user) : '{}'

		render 'index', :layout => false
	end

	private

	def get_json(records)
		hash_arr = records.map { |r| r.attributes.merge({:username => r.user.username}) }
		return ActiveSupport::JSON.encode hash_arr
	end

end
