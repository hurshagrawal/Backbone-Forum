beforeEach ->
	jasmine.getFixtures().fixturesPath = '/app/templates/'

	setFixtures '<div id="topbar"></div><div id="container"></div>'

	window.JST =
		post: Haml readFixtures('post.jst.haml')
		postList: Haml readFixtures('postList.jst.haml')
		postForm: Haml readFixtures('postForm.jst.haml')
		login: Haml readFixtures('login.jst.haml')
		user: Haml readFixtures('user.jst.haml')
		newRoom: Haml readFixtures('newRoom.jst.haml')

	forum.app = new forum.ForumRouter()
	forum.app.navigate '', true

