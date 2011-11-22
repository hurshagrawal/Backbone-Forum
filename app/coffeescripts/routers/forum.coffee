class forum.ForumRouter extends Backbone.Router
	routes:
		'': 'home'
		'postlist': 'posts'

	initialize: ->
		#makes and sets the current user
		forum.currentUser = new forum.User()
		forum.currentUserView = new forum.UserView
			model: forum.currentUser
		$('#topbar').append forum.currentUserView.render().el

		#makes and renders list of posts
		forum.postList = new forum.PostList()

	posts: ->
		$container = $('#container')

		forum.postListView = new forum.PostListView
			collection: forum.postList

		forum.postFormView = new forum.PostFormView
			collection: forum.postList
			model: forum.currentUser

		$container.empty().append(forum.postListView.render().el)
											.append(forum.postFormView.render().el)
