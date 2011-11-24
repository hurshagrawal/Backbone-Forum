describe 'navigation', ->
	it "should render room form when new roundtable is clicked", ->
		$('#new-room-button').click()
		expect($('#new-room-form')).toBe 1

