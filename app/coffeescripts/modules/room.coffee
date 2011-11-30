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
		modelObj = @model.toJSON()
		modelObj.subheading = @toSentence modelObj.participants
		modelObj.dateStr = @toDateString modelObj.created_at

		renderedContent = JST['roomListRoom'] modelObj
		$(@el).html renderedContent

		return this

	showRoom: =>
		if forum.roomSideView?
			forum.sideRoom.set @model.toJSON()
		else
			forum.sideRoom = new forum.Room @model.toJSON()
			forum.roomSideView = new forum.RoomSideView
				model: forum.sideRoom

			$('#container').append forum.roomSideView.render().el

			elementWidth = $(forum.roomSideView.el).width()
			targetLeft = $('.side-bg').offset().left - 20 - elementWidth
			$(forum.roomSideView.el).css 'left', targetLeft
			forum.roomSideView.trigger 'slideOut'

	toSentence: (arr) ->
		return "with #{arr[0]}" if arr.length is 1
		return "between #{arr.join(" and ")}" if arr.length is 2

		arrClone = arr.slice 0
		lastEntry = arrClone.splice arrClone.length - 1
		return "between #{arrClone.join(', ')}, and #{lastEntry}"

	toDateString: (dateStr) ->
		date = new Date(dateStr)
		str = "#{date.getHours()}:#{date.getMinutes()} "
		str += "#{date.getDate()}/#{date.getMonth()}/"
		str += "#{date.getFullYear().toString().substr(2,2)}"
		return str

###
# View for sidebar on right of room list
#
###
class forum.RoomSideView extends Backbone.View
	className: 'section sidebar span6'

	events:
		'click .close': 'slideIn'
		'click .go': 'showRoom'

	initialize: ->
		@model.bind 'change', @render
		this.bind 'slideIn', this.slideIn
		this.bind 'slideOut', this.slideOut

	render: =>
		modelObj = @model.toJSON()
		modelObj.posts = forum.postList.select (entry) =>
			entry.get('room_id') == @model.get('id')

		modelObj.firstPost = @truncatePost(modelObj.posts[0].get('content'), 95)
		if modelObj.posts.length > 1
			modelObj.secondPost = @truncatePost(modelObj.posts[1].get('content'), 35)


		renderedContent = JST['roomSideView'] modelObj
		$(@el).html renderedContent
		@slideOut() if @displayed == false and @displayed != null
		return this

	slideOut: =>
		$(@el).css('visibility', 'visible')
					.animate { left: "+=#{$(@el).width()}" }, 200
		@displayed = true

	slideIn: =>
		$(@el).animate { left: "-=#{$(@el).width()}" }, 200, =>
			$(@el).css 'visibility', 'hidden'
		@displayed = false

	showRoom: =>
		forum.app.navigate "show/room/#{@model.get('id')}", true
		forum.roomSideView = null

	# truncates string but does not cut off mid-word
	truncatePost: (str, length) ->
		return str if str.length <= length
		arr = str.substr(0, length).split(" ")
		arr.splice arr.length - 1, 1
		return arr.join(" ") + "..."

###
#	View for room list on main page
#
###
class forum.RoomListView extends Backbone.View
	className: 'list'

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
	className: 'section new-room-form'

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
