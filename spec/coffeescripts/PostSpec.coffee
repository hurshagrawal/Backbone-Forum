postData = [
	user: "Hursh Agrawal"
	content: "Hello, this is a sample post for testing. Hear me roar."
,
	user: "Herp Derp"
	content: "Derp herp derp herp herp derp derp derp testing testing herp derp."
]

extraPost =
	user: "Foo Bar"
	content: "Hello there, this is more test data lalalalalalala. Testing 123 456 789."

describe "post", ->

	describe "post model", ->
		beforeEach ->
			@post = new forum.Post postData[0]

		it "creates model from data", ->
			expect(@post.get('user')).toBe postData[0].user

	describe "post view", ->
		beforeEach ->
			@post = new forum.Post postData[0]
			window.JST = { post: _.template readFixtures('post.jst') }
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
			window.JST =
				post: _.template readFixtures('post.jst')
				postList: _.template readFixtures('postList.jst')
			forum.app = new forum.ForumRouter();
			forum.postList.reset postData

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





















