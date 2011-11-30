class forum.Post extends Backbone.Model

class forum.PostList extends Backbone.Collection
	model: forum.Post
	url: '/db/posts'

###
#	View for each post in a Roundtable
#
###
class forum.PostView extends Backbone.View
	tagName: 'li'
	className: 'post'

	initialize: ->
		@model.bind 'change', @render

	render: =>
		renderedContent = JST['post'] this.model.toJSON()
		$(@el).html renderedContent
		return this

###
#	View for list of posts in a Roundtable
#
###

class forum.PostListView extends Backbone.View
	className: 'post-list list'

	events:
		'click .prev': 'showPrev'
		'click .next': 'showNext'

	initialize: ->
		#causes the view to render whenever the collection's data is loaded
		@collection.bind 'reset', @render
		@collection.bind 'add', @render

	render: =>
		$(@el).html JST['postList']
			topic: @model.get 'topic'
		$postList = this.$('.post-list')

		#iterates through posts, renders, appends to <ul>
		@collection.each (post) =>
			view = new forum.PostView
				model: post
				collection: @collection
			$postList.append view.render().el

		return this

	showPrev: =>
		forum.animateDirection =
			from: 'left'
			to: 'right'

		roomIndex = forum.roomList.indexOf(@model) - 1
		if roomIndex < 0
			newRoomID = forum.roomList.last().get('id')
		else
			newRoomID = forum.roomList.models[roomIndex].get('id')

		forum.app.navigate "show/room/#{newRoomID}", true

	showNext: =>
		forum.animateDirection =
			from: 'right'
			to: 'left'

		roomIndex = forum.roomList.indexOf(@model) + 1
		if roomIndex == forum.roomList.models.length
			newRoomID = forum.roomList.first().get('id')
		else
			newRoomID = forum.roomList.models[roomIndex].get('id')

		forum.app.navigate "show/room/#{newRoomID}", true

###
# View for posting new posts
#
###

class forum.PostFormView extends Backbone.View
	tagName: 'div'
	className: 'form-wrapper'

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
		#nothing happens if you're not logged in - TODO - change this to a notification
		return unless forum.currentUser.get('username')?

		content = this.$('textarea').val().trim()
		if content is ""
			this.$('textarea').addClass 'error'
			return

		post = @collection.create
			post:
				room_id: @model.id
				user_id: forum.currentUser.get 'id'
				content: content
		,
			success: =>
				#adds post to global post list
				forum.postList.add post

				username = forum.currentUser.get 'username'
				#for rendering the username on posts
				post.set
					username: username

				#for rendering username on rooms
				userArr = @model.get 'participants'
				unless _.include(userArr, username)
					userArr.push username
					@model.set
						participants: userArr

