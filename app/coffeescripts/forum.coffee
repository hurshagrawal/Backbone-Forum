window.forum =
	Models: {}
	Collections: {}
	Views: {}
	Routers: {}
	init: (posts) ->
		new Forum.Routers.Posts()
		@tasks = new Forum.Collections.Posts posts
		Backbone.history.start()
