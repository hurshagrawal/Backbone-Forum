class forum.PostView extends Backbone.View
	tagName: 'li'
	className: 'post'

	initialize: ->
		@model.bind 'change', @render

	render: =>
		renderedContent = JST['post'] this.model.toJSON()
		$(@el).html renderedContent
		return this
