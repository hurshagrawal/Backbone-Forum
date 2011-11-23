postData = [
	username: "Hursh Agrawal"
	content: "Hello, this is a sample post for testing. Hear me roar."
,
	username: "Herp Derp"
	content: "Derp herp derp herp herp derp derp derp testing testing herp derp."
]

extraPost =
	username: "Foo Bar"
	content: "Hello there, this is more test data lalalalalalala. Testing 123 456 789."

userData = "{'created_at':'2011-11-18T23:35:07Z','id':1,'updated_at':'2011-11-18T23:35:07Z','username':'Hursh'}"

describe "post", ->

	describe "post model", ->
		beforeEach ->
			@post = new forum.Post postData[0]

		it "creates model from data", ->
			expect(@post.get('username')).toBe postData[0].username

	describe "post view", ->
		beforeEach ->
			@post = new forum.Post postData[0]
			@postView = new forum.PostView { model: @post }
			@postView.render()

		it "creates a view from the model", ->
			expect(@postView.constructor.name).toBe "PostView"

		it "cascades changes in the model to the view", ->
			@post.set postData[1]
			viewContent = $(@postView.el).find('.content').html()
			expect(viewContent).toBe postData[1].content

	describe "post collection", ->
		beforeEach ->
			@postList = new forum.PostList postData

		it "creates a collection from all the models", ->
			expect(@postList.toJSON().length).toBe 2

		it "correctly incorporates model data", ->
			contentArr = (post.content for post in postData)
			expect(@postList.pluck('content')).toEqual contentArr

	describe "post list view", ->
		beforeEach ->
			forum.app = new forum.ForumRouter()
			forum.postList.reset postData
			forum.currentUser.set userData
			forum.app.navigate '', true
			forum.app.navigate 'postlist', true

		it "creates a postList collection", ->
			expect(forum.postList.constructor.name).toBe "PostList"

		it "creates a postList View with the correct template", ->
			#assumes the template has the header tag
			headerArr = $(forum.postListView.el).find 'header'
			expect(headerArr.length).toNotBe 0

		it "creates a postList View with the right amount of posts", ->
			postArr = $(forum.postListView.el).find '.post'
			expect(postArr.length).toEqual postData.length

		it "adds a post to the view when collection is changed", ->
			forum.postList.add extraPost
			content = $(forum.postListView.el).find('.post:last .content').html()
			expect(content).toEqual extraPost.content

		describe "submitting new posts", ->
			beforeEach ->
				#set mock server for ajax calls
				sinon.spy $, 'ajax'
				@server = sinon.fakeServer.create()

				$('.post-form textarea').val extraPost.content
				$('.post-form button').click()

			afterEach ->
				$.ajax.restore()
				@server.restore()

			describe "successful submit", ->
				beforeEach ->
					@server.respondWith [ 200, {}, "" ]
					@server.respond()

				it "adds to the collection when a new post is posted", ->
					postArr = $(forum.postListView.el).find '.post'
					expect(postArr.length).toBe postData.length + 1

				it "puts the newly submitted post last", ->
					lastPost = $(forum.postListView.el).find '.post:last'
					expect(lastPost.find('.content').html()).toEqual extraPost.content

			describe "failing submit", ->
				beforeEach ->
					@server.respondWith [ 404, {}, "" ]
					@server.respond()

				it "should not add any more posts", ->
					postArr = $(forum.postListView.el).find '.post'
					expect(postArr.length).toBe postData.length

				it "last post should be original last post", ->
					lastPost = $(forum.postListView.el).find '.post:last'
					expect(lastPost.find('.content').html()).toNotEqual extraPost.content






















