window.forum =
	init: (posts) ->
		new Forum.Routers.Posts()
		@tasks = new Forum.Collections.Posts posts
		Backbone.history.start()

# change template settings to be more like mustache.js
_.templateSettings = {
	evaluate    : /\{\{\{([\s\S]+?)\}\\}/g,
	interpolate : /\{\{([\s\S]+?)\}\}/g,
	escape      : /\{\{\-([\s\S]+?)\}\}/g
};
