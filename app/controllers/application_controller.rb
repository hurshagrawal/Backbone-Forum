class ApplicationController < ActionController::Base
	protect_from_forgery
	before_filter :get_current_user

	private

	def get_current_user
		if session[:user_id]
			@current_user = User.find session[:user_id]
		end
	end

end
