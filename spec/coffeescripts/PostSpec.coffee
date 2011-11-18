postData = [
	user: "Hursh Agrawal"
	content: "Hello, this is a sample post for testing. Hear me roar."
,
	user: "Herp Derp"
	content: "Derp herp derp herp herp derp derp derp testing testing herp derp."
]

describe "Post", ->
	beforeEach ->
		window.JST = { post: _.template readFixtures('post.jst') }
		@post = new forum.Post postData[0]
		@postView = new forum.PostView { model: @post }
		@postView.render()

	it "creates model from data", ->
		expect(@post.get('user')).toBe postData[0].user

	it "creates a view from the model", ->
		expect(@postView.constructor.name).toBe "PostView"

	it "cascades changes in the model to the view", ->
		@post.set postData[1]
		viewContent = $(@postView.el).find('.content').html()
		expect(viewContent).toBe postData[1].content
