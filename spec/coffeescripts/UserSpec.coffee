userData =
	username: "username"
	password: "password"

userResponse = "{\"created_at\":\"2011-11-18T23:35:07Z\",\"id\":1,\"updated_at\":\"2011-11-18T23:35:07Z\",\"username\":\"Hursh\"}"

describe "user", ->
	beforeEach ->
		forum.currentUser.set {}

	describe "when not logged in", ->

		describe "user model", ->
			it "should exist", ->
				expect(forum.currentUser).toBeDefined()

			it "should not have a username", ->
				expect(forum.currentUser.get('username')).toBeUndefined()

		describe "user view", ->

			it "should exist", ->
				userView = $('.topbar .user-panel')
				expect(userView.length).toNotBe 0

	describe "signing up", ->
		beforeEach ->
			#set mock server for ajax calls
			sinon.spy $, 'ajax'
			@server = sinon.fakeServer.create()

			form = $(forum.currentUserView.el)
			form.find('.un').val userData.username
			form.find('.pw').val userData.password
			form.find('#signup-button').click()

			@server.respondWith [ 200,
				"Content-Type": "application/json"
			, userResponse ]
			@server.respond()

		afterEach ->
			$.ajax.restore()
			@server.restore()

		it "should switch to the logged in view when signing up", ->
			expect($('.topbar #signup-button').length).toBe 0

		it "should display the user view when signed up", ->
			expect($('.topbar .user-text').length).toNotBe 0

		it "should log you out when you click logout", ->
			$('#logout-button').click()
			@server.respond()
			expect($('.topbar #signup-button').length).toBe 1

	describe "logging in", ->
		#TODO - fill this out for full coverage
