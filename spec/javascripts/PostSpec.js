(function() {
  var extraPost, postData;

  postData = [
    {
      user: "Hursh Agrawal",
      content: "Hello, this is a sample post for testing. Hear me roar."
    }, {
      user: "Herp Derp",
      content: "Derp herp derp herp herp derp derp derp testing testing herp derp."
    }
  ];

  extraPost = {
    user: "Foo Bar",
    content: "Hello there, this is more test data lalalalalalala. Testing 123 456 789."
  };

  describe("post", function() {
    describe("post model", function() {
      beforeEach(function() {
        return this.post = new forum.Post(postData[0]);
      });
      return it("creates model from data", function() {
        return expect(this.post.get('user')).toBe(postData[0].user);
      });
    });
    describe("post view", function() {
      beforeEach(function() {
        this.post = new forum.Post(postData[0]);
        window.JST = {
          post: _.template(readFixtures('post.jst'))
        };
        this.postView = new forum.PostView({
          model: this.post
        });
        return this.postView.render();
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
    describe("post collection", function() {
      beforeEach(function() {
        return this.postList = new forum.PostList(postData);
      });
      it("creates a collection from all the models", function() {
        return expect(this.postList.toJSON().length).toBe(2);
      });
      return it("correctly incorporates model data", function() {
        var contentArr, post;
        contentArr = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = postData.length; _i < _len; _i++) {
            post = postData[_i];
            _results.push(post.content);
          }
          return _results;
        })();
        return expect(this.postList.pluck('content')).toEqual(contentArr);
      });
    });
    return describe("post list view", function() {
      beforeEach(function() {
        window.JST = {
          post: _.template(readFixtures('post.jst')),
          postList: _.template(readFixtures('postList.jst'))
        };
        forum.app = new forum.ForumRouter();
        return forum.postList.reset(postData);
      });
      it("creates a postList collection", function() {
        return expect(forum.postList.constructor.name).toBe("PostList");
      });
      it("creates a postList View with the correct template", function() {
        var headerArr;
        headerArr = $(forum.postListView.el).find('header');
        return expect(headerArr.length).toNotBe(0);
      });
      it("creates a postList View with the right amount of posts", function() {
        var postArr;
        postArr = $(forum.postListView.el).find('.post');
        return expect(postArr.length).toEqual(postData.length);
      });
      return it("adds a post to the view when collection is changed", function() {
        var content;
        forum.postList.add(extraPost);
        content = $(forum.postListView.el).find('.post:last .content').html();
        return expect(content).toEqual(extraPost.content);
      });
    });
  });

}).call(this);
