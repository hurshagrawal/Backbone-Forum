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

	home: ->
		$ -> #wait until page loads, as data is bootstrapped

			# animation preparation
			if @toAnimate is true
				$container = $('<div class="slide leftside"></div>')
											.appendTo('.container.main')
			else
				$container = $("#container")

			# actual code
			forum.roomListView = new forum.RoomListView
				collection: forum.roomList

			$container.empty() unless @toAnimate is true
			$container.append forum.roomListView.render().el

			# animation cleanup
			if @toAnimate is true
				#scrolls to top of page
				$("html:not(:animated),body:not(:animated)")
					.animate { scrollTop: 0 }, 200

				$('.center').addClass('rightside').removeClass('center')
																					.removeAttr('id')
				$('.leftside').attr('id', 'container')

				window.setTimeout ->
					$('.leftside').addClass('center').removeClass('leftside')
				, 0
				window.setTimeout (-> $('.rightside').remove()), 500

			#animates transitions in the future
			@toAnimate = true

	showRoom: (room_id) ->
		$ ->
			#animation preparation
			if @toAnimate is true
				$container = $('<div class="slide rightside"></div>')
												.appendTo('.container.main')
			else
				$container = $("#container")

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

			#animation cleanup
			if @toAnimate
				#scrolls to top of page
				$("html:not(:animated),body:not(:animated)")
					.animate { scrollTop: 0 }, 200

				$('.sidebar').addClass('slide').css('left', '-1500px')
				$('.center').addClass('leftside').removeClass('center')
																				 .removeAttr('id')
				$('.rightside').attr('id', 'container')

				window.setTimeout ->
					$('.rightside').addClass('center').removeClass('rightside')
				, 0
				window.setTimeout (-> $('.leftside').remove()), 500

			#animates transitions in the future
			@toAnimate = true

	showNew: ->
		forum.newRoomView = new forum.NewRoomView
			collection: forum.roomList

		$('#container').empty().append forum.newRoomView.render().el

		#animates transitions in the future
		@toAnimate = true


