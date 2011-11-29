class Room < ActiveRecord::Base

	belongs_to :user

	has_many :posts

	def participants
		posts.map {|p| p.user.username }.uniq
	end
end
