class forum.PostFormView extends Backbone.View
	tagName: 'div'
	className: 'post-form'

	events:
		'click .post-form button': 'submit'

	initialize: ->
		#causes the view to render whenever the collection's data is loaded
		@collection.bind 'reset', @render
		@collection.bind 'add', @render
		@model.bind 'change', @render

	render: =>
		if typeof(@model.get 'username') == "undefined"
			$(@el).html ''
		else
			$(@el).html JST['postForm']()

		return this

	#submits the post - appends to the post list and syncs with server
	submit: =>
		@collection.create
			username: @model.get 'username'
			content: this.$('textarea').val()
