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
			$container = $("#container")

			forum.roomListView = new forum.RoomListView
				collection: forum.roomList

			$container.empty().append forum.roomListView.render().el

	showRoom: (room_id) ->
		$ ->
			$container = $('#container')
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

			$container.empty().append(forum.postListView.render().el)
												.append(forum.postFormView.render().el)

	showNew: ->
		forum.newRoomView = new forum.NewRoomView
			collection: forum.roomList

		$('#container').empty().append forum.newRoomView.render().el


