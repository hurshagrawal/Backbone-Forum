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
		#creates the room entry
		room = @collection.create
			room:
				user_id: forum.currentUser.get 'id'
				topic: this.$('.topic-text').val()
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
						content: this.$('.post-text').val()
				,
					success: =>
						forum.postList.add post
						post.set
							username: forum.currentUser.get 'username'
						forum.app.navigate "show/room/#{room.get('id')}", true
