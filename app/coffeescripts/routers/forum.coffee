class forum.ForumRouter extends Backbone.Router
	routes:
		'': 'home'
		'postlist': 'posts'

	initialize: ->
		#makes and sets the current user
		forum.currentUser = new forum.User()

		#makes and renders list of posts
		forum.postList = new forum.PostList()
		forum.postListView = new forum.PostListView
			collection: forum.postList

	posts: ->
		$container = $('#container')
		$container.empty().append forum.postListView.render().el
