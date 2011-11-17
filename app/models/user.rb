class User < ActiveRecord::Base

	has_many :rooms, :posts

end
