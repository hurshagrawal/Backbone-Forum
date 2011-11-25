roomData =
	topic: "Topic for my new Roundtable"
	post: "First post topic for my new Roundtable"

roomResponse = ""

userResponse = "{\"created_at\":\"2011-11-18T23:35:07Z\",\"id\":1,\"updated_at\":\"2011-11-18T23:35:07Z\",\"username\":\"Hursh\"}"

describe "room", ->
	beforeEach ->
		roomListLength = forum.roomList.length
		forum.currentUser.set userData #signs in a user

	describe "room model", ->
		beforeEach ->
			@room = new forum.Room roomData[0]

	describe "room view", ->
		beforeEach ->
			$('#new-room-button').click()

		it "should render room form when new roundtable is clicked", ->
			expect($('.new-room-form').length).toBe 1

		it "should have roomList as a collection", ->
			expect(forum.newRoomView.collection.constructor.name).toBe "RoomList"

		it "should contain a topic and first post field", ->
			expect($('.new-room-form textarea').length).toBe 2

	describe "making new rooms", ->
		beforeEach ->
			#set mock server for ajax calls
			sinon.spy $, 'ajax'
			@server = sinon.fakeServer.create()

			$('#new-room-button').click()
			$('.new-room.form topic').val roomData.topic
			$('.new-room.form post').val roomData.post
			$('.new-room.form submit').click()

			@server.respondWith [ 200,
				"Content-Type": "application/json"
			, roomResponse ]
			@server.respond()

		afterEach ->
			$.ajax.restore()
			@server.restore()

		it 'should create a new room entry', ->
			expect(forum.roomList.length).toBe roomListLength + 1

		it 'should make a room entry with the right topic', ->
			expect(forum.roomList.last().toJSON().topic).toEqual roomData.topic

		it 'should make a post entry with the right contents', ->
			expect(forum.postList.last().toJSON().content).toEqual roomData.post



