class forum.RoomListView extends Backbone.View
	tagName: 'section'
	className: 'rooms'

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
