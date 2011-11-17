class PostsController < ApplicationController
	respond_to :json

	# GET /posts.json
	def index
		@posts = Post.all
		respond_with @posts
	end

	# GET /posts/1.json
	def show
		@post = Post.find(params[:id])
		respond_with @post
	end

	# GET /posts/new.json
	def new
		@post = Post.new
		respond_with @post
	end

	# GET /posts/1/edit
	def edit
		@post = Post.find(params[:id])
	end

	# POST /posts.json
	def create
		@post = Post.new(params[:post])

		if @post.save
			respond_with @post
		else
			respond_with @post, :status => :unprocessable_entity
		end
	end

	# PUT /posts/1.json
	def update
		@post = Post.find(params[:id])

		if @post.update_attributes(params[:post])
			respond_with @post
		else
			respond_with @post, :status => :unprocessable_entity
		end
	end

	# DELETE /posts/1.json
	def destroy
		@post = Post.find(params[:id])
		@post.destroy

		respond_width { head :ok }
	end
end
