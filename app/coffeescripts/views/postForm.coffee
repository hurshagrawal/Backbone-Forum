class forum.PostFormView extends Backbone.View
	tagName: 'div'
	className: 'post-form'

	events:
		'click .post-form button': 'submit'

	initialize: ->
		#causes the view to render whenever the collection's data is loaded
		@collection.bind 'reset', @render
		@collection.bind 'add', @render
		forum.currentUser.bind 'change', @render

	render: =>
		if forum.currentUser.get('username')?
			$(@el).html JST['postForm']()
		else
			$(@el).html ''

		@delegateEvents() #rebind events
		return this

	#submits the post - appends to the post list and syncs with server
	submit: =>
		post = @collection.create
			post:
				room_id: @model.id
				user_id: forum.currentUser.get 'id'
				content: this.$('textarea').val()
		,
			success: =>
				forum.postList.add post
				post.set
					username: forum.currentUser.get 'username'

