class forum.Navigation extends Backbone.View
	tagName: 'section'
	className: 'navigation'

	events:
		'click .home': 'showHome'

	initialize: ->
		forum.currentUserView = new forum.UserView
			model: forum.currentUser

	render: =>
		renderedContent =  JST['navigation']()

		$(@el).html(renderedContent)
					.append(forum.currentUserView.render().el)

		return this

	showHome: =>
		forum.app.navigate '', true
