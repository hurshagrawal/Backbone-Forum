roomData = [



]




describe "room", ->

	describe "room model", ->
		beforeEach ->
			@room = new forum.Room roomData[0]
