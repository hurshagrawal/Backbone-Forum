class forum.User extends Backbone.Model
	url: '/db/users'

###
#	User login/signup/create a new roundtable link in topbar
#
###
class forum.UserView extends Backbone.View
	tagName: 'span'
	className: 'user-panel pull-right'

	events:
		'click #signup-button': 'signup'
		'click #login-button': 'login'
		'click #logout-button': 'logout'
		'click #new-room-button': 'showNewForm'

	initialize: ->
		@model.bind 'change', @render

	render: =>
		if @model.get('username')?
			renderedContent = JST['user'] @model.toJSON()
		else
			renderedContent =  JST['login'] @model.toJSON()

		$(@el).html renderedContent
		return this

	signup: ->

		un = this.$('.un').val().
		pw = this.$('.pw').val()

		return if un.trim() is "" or pw.trim() is ""

		newUser = new forum.User
			username: un
			password: pw

		newUser.save {},
			success: (mode, data) =>
				if data.exists == true #if username already exists
					@render()
					this.$('.alert-text').html 'That username is taken'
				else
					@model.set data
			error: (object, error) =>
				this.$('.alert-text').html 'There was some sort of error. Try again.'

	login: ->
		data =
			username: this.$('.un').val()
			password: this.$('.pw').val()

		$.post '/db/sessions', data, (response) =>
			if response.exists == true
				@model.set response.user
			else if response.exists == false
				@render()
				this.$('.alert-text').html 'Username or password is incorrect'
			else
				this.$('.alert-text').html 'There was some sort of error. Try again.'

	logout: ->
		$.post '/db/sessions', { '_method': 'delete' }, (response) =>
			@model.clear()
		forum.app.navigate '', true

	showNewForm: =>
		forum.app.navigate 'show/new', true

