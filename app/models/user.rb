class User < ActiveRecord::Base

	has_many :rooms
	has_many :posts

end
