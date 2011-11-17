class Post < ActiveRecord::Base

	belongs_to :user, :room

end
