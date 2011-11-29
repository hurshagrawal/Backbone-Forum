(function() {
  var extraPost, postData, userData;
  postData = [
    {
      username: "Hursh Agrawal",
      content: "Hello, this is a sample post for testing. Hear me roar."
    }, {
      username: "Herp Derp",
      content: "Derp herp derp herp herp derp derp derp testing testing herp derp."
    }
  ];
  extraPost = {
    username: "Foo Bar",
    content: "Hello there, this is more test data lalalalalalala. Testing 123 456 789."
  };
  userData = "{'created_at':'2011-11-18T23:35:07Z','id':1,'updated_at':'2011-11-18T23:35:07Z','username':'Hursh'}";
  describe("post", function() {
    describe("post model", function() {
      beforeEach(function() {
        return this.post = new forum.Post(postData[0]);
      });
      return it("creates model from data", function() {
        return expect(this.post.get('username')).toBe(postData[0].username);
      });
    });
    describe("post view", function() {
      beforeEach(function() {
        this.post = new forum.Post(postData[0]);
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
        forum.app = new forum.ForumRouter();
        forum.postList.reset(postData);
        forum.currentUser.set(userData);
        forum.app.navigate('', true);
        return forum.app.navigate('postlist', true);
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
      it("adds a post to the view when collection is changed", function() {
        var content;
        forum.postList.add(extraPost);
        content = $(forum.postListView.el).find('.post:last .content').html();
        return expect(content).toEqual(extraPost.content);
      });
      return describe("submitting new posts", function() {
        beforeEach(function() {
          sinon.spy($, 'ajax');
          this.server = sinon.fakeServer.create();
          $('.post-form textarea').val(extraPost.content);
          return $('.post-form button').click();
        });
        afterEach(function() {
          $.ajax.restore();
          return this.server.restore();
        });
        describe("successful submit", function() {
          beforeEach(function() {
            this.server.respondWith([200, {}, ""]);
            return this.server.respond();
          });
          it("adds to the collection when a new post is posted", function() {
            var postArr;
            postArr = $(forum.postListView.el).find('.post');
            return expect(postArr.length).toBe(postData.length + 1);
          });
          return it("puts the newly submitted post last", function() {
            var lastPost;
            lastPost = $(forum.postListView.el).find('.post:last');
            return expect(lastPost.find('.content').html()).toEqual(extraPost.content);
          });
        });
        return describe("failing submit", function() {
          beforeEach(function() {
            console.log($('.container').html());
            this.server.respondWith([404, {}, ""]);
            return this.server.respond();
          });
          it("should not add any more posts", function() {
            var postArr;
            postArr = $(forum.postListView.el).find('.post');
            return expect(postArr.length).toBe(postData.length);
          });
          return it("last post should be original last post", function() {
            var lastPost;
            lastPost = $(forum.postListView.el).find('.post:last');
            return expect(lastPost.find('.content').html()).toNotEqual(extraPost.content);
          });
        });
      });
    });
  });
}).call(this);
