class forum.Navigation extends Backbone.View
	tagName: 'div'
	className: 'navigation fill'

	events:
		'click .home': 'showHome'

	initialize: ->
		forum.currentUserView = new forum.UserView
			model: forum.currentUser

	render: =>
		renderedContent =  JST['navigation']
			user: forum.currentUser.get('username')

		$(@el).html(renderedContent)
					.find('.container')
					.append(forum.currentUserView.render().el)

		return this

	showHome: =>
		forum.app.navigate '', true
