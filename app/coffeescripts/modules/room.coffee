class forum.Room extends Backbone.Model


class forum.RoomList extends Backbone.Collection
	model: forum.Room
	url: '/db/rooms'

###
#	View for each room entry in the room list
#
###
class forum.RoomListRoomView extends Backbone.View
	tagName: 'li'
	className: 'post span10'

	events:
		'click .go': 'showRoom'

	initialize: ->
		@model.bind 'change', @render

	render: =>
		renderedContent = JST['roomListRoom'] this.model.toJSON()
		$(@el).html renderedContent
		return this

	showRoom: =>
		forum.app.navigate "show/room/#{@model.get('id')}", true

###
#	View for room list on main page
#
###
class forum.RoomListView extends Backbone.View
	tagName: 'section'
	className: 'rooms span10'

	initialize: ->
		#causes the view to render whenever the collection's data is loaded
		@collection.bind 'reset', @render
		@collection.bind 'add', @render

	render: =>
		$(@el).html JST['roomList']()
		$postList = this.$('.room-list')

		#iterates through posts, renders, appends to <ul>
		@collection.each (room) =>
			view = new forum.RoomListRoomView
				model: room
				collection: @collection
			$postList.append view.render().el

		return this

###
#	View for creating a Roundtable page
#
###
class forum.NewRoomView extends Backbone.View
	tagName: 'div'
	className: 'new-room-form'

	events:
		'click .submit': 'submit'

	initialize: ->

	render: =>
		$(@el).html JST['newRoom']()
		return this

	submit: =>
		topicText = this.$('.topic-text').val().trim()
		postText = this.$('.post-text').val().trim()

		$('.error').removeClass 'error'
		this.$('.topic-text').addClass('error') if topicText is ""
		this.$('.post-text').addClass('error') if postText is ""
		return if topicText is "" or postText is ""

		#creates the room entry
		room = @collection.create
			room:
				user_id: forum.currentUser.get 'id'
				topic: topicText
		,
			success: =>
				room.set
					username: forum.currentUser.get 'username'

				#creates a post list for the room
				room.collection = new forum.PostList()

				#creates an initial post for the room
				post = room.collection.create
					post:
						room_id: room.get 'id'
						user_id: forum.currentUser.get 'id'
						content: postText
				,
					success: =>
						forum.postList.add post
						post.set
							username: forum.currentUser.get 'username'
						forum.app.navigate "show/room/#{room.get('id')}", true
