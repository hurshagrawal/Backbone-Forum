(function() {
  var postData;

  postData = [
    {
      user: "Hursh Agrawal",
      content: "Hello, this is a sample post for testing. Hear me roar."
    }, {
      user: "Herp Derp",
      content: "Derp herp derp herp herp derp derp derp testing testing herp derp."
    }
  ];

  describe("Post", function() {
    beforeEach(function() {
      window.JST = {
        post: _.template(readFixtures('post.jst'))
      };
      this.post = new forum.Post(postData[0]);
      this.postView = new forum.PostView({
        model: this.post
      });
      return this.postView.render();
    });
    it("creates model from data", function() {
      return expect(this.post.get('user')).toBe(postData[0].user);
    });
    it("creates a view from the model", function() {
      return expect(this.postView.constructor.name).toBe("PostView");
    });
    return it("cascades changes in the model to the view", function() {
      var viewContent;
      this.post.set(postData[1]);
      viewContent = $(this.postView.el).find('.content').html();
      return expect(viewContent).toBe(postData[1].content);
    });
  });

}).call(this);
