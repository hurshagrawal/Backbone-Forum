class forum.ForumRouter extends Backbone.Router
	routes:
		'': 'home'
		'show/room/:room_id': 'showRoom'
		'show/new': 'showNew'

	initialize: ->
		#makes and sets the current user
		forum.currentUser = new forum.User()

		#makes navigation
		forum.navigation = new forum.Navigation()
		$('.topbar').append forum.navigation.render().el

		#makes and renders list of posts
		forum.postList = new forum.PostList()
		forum.roomList = new forum.RoomList()

	prepareAnimation: (from) =>
		fromSide = if from is 'left' then 'leftside' else 'rightside'

		if @toAnimate is true
			return $("<div class='slide #{fromSide}'></div>")
										.appendTo('.container.main')
		else
			return $("#container")

	startAnimation: (direction) =>
		fromSide = "#{if direction is 'left' then 'right' else 'left'}side"
		toSide = "#{direction}side"

		#scrolls to top of page
		$("html:not(:animated),body:not(:animated)")
			.animate { scrollTop: 0 }, 200

		$('.sidebar').addClass('slide').css('left', '-1500px')
		$('.center').addClass(toSide).removeClass('center')
															 	.removeAttr('id')
		$(".#{fromSide}").attr('id', 'container')

		window.setTimeout ->
			$(".#{fromSide}").addClass('center').removeClass("#{fromSide}")
		, 0
		window.setTimeout (-> $(".#{toSide}").remove()), 500

	home: =>
		$ => #wait until page loads, as data is bootstrapped
			forum.roomSideView.displayed = false
			$container = @prepareAnimation 'left'

			# actual code
			forum.roomListView = new forum.RoomListView
				collection: forum.roomList

			$container.empty() unless @toAnimate is true
			$container.append forum.roomListView.render().el

			# animation start
			@startAnimation('right') if @toAnimate is true

			#animates transitions in the future
			@toAnimate = true

	showRoom: (room_id) =>
		$ =>
			if forum.animateDirection?
				$container = @prepareAnimation forum.animateDirection.from
			else
				$container = @prepareAnimation 'right'

			#actual code
			room = forum.roomList.get(room_id)
			#gets post post and sets as room's collection for later use
			postList = forum.postList.select (entry) =>
				entry.get('room_id') == room.get('id')

			room.collection = new forum.PostList(postList)
			forum.postListView = new forum.PostListView
				collection: room.collection
				model: room

			forum.postFormView = new forum.PostFormView
				collection: room.collection
				model: room

			$container.empty() unless @toAnimate is true
			$container.append(forum.postListView.render().el)
								.append(forum.postFormView.render().el)

			# animation start
			if @toAnimate is true
				if forum.animateDirection?
					@startAnimation forum.animateDirection.to
					forum.animateDirection = null
				else
					@startAnimation 'left'

			#animates transitions in the future
			@toAnimate = true

	showNew: =>
		#animation preparation
		$container = @prepareAnimation 'right'

		forum.newRoomView = new forum.NewRoomView
			collection: forum.roomList

		$container.append forum.newRoomView.render().el

		# animation start
		@startAnimation('left') if @toAnimate is true

		#animates transitions in the future
		@toAnimate = true


