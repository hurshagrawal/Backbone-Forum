class StaticsController < ApplicationController

	def index
		post_hash_arr = Post.all.map { |p| p.attributes.merge({:username => p.user.username}) }
		@posts = ActiveSupport::JSON.encode post_hash_arr

		@current_user_json = @current_user ? ActiveSupport::JSON.encode(@current_user) : '{}'

		render 'index', :layout => false
	end

end
