class forum.RoomListRoomView extends Backbone.View
	tagName: 'li'
	className: 'post'

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

