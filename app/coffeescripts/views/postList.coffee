class forum.PostListView extends Backbone.View
	tagName: 'section'
	className: 'post-list'

	events:
		'click .post-form button': 'submit'

	initialize: ->
		#causes the view to render whenever the collection's data is loaded
		@collection.bind 'reset', @render
		@collection.bind 'add', @render

	render: =>
		$(@el).html JST['postList']()
		$postList = this.$('.post-list')

		#iterates through posts, renders, appends to <ul>
		@collection.each (post) =>
			view = new forum.PostView
				model: post
				collection: @collection
			$postList.append view.render().el

		return this

	#submits the post - appends to the post list and syncs with server
	submit: =>
		@collection.create
			username: "Hursh"
			content: this.$('.post-form textarea').val()

