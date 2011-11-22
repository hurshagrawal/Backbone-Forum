(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  forum.ForumRouter = (function() {

    __extends(ForumRouter, Backbone.Router);

    function ForumRouter() {
      ForumRouter.__super__.constructor.apply(this, arguments);
    }

    ForumRouter.prototype.routes = {
      '': 'home',
      'postlist': 'posts'
    };

    ForumRouter.prototype.initialize = function() {
      forum.currentUser = new forum.User();
      forum.currentUserView = new forum.UserView({
        model: forum.currentUser
      });
      $('#topbar').append(forum.currentUserView.render().el);
      return forum.postList = new forum.PostList();
    };

    ForumRouter.prototype.posts = function() {
      var $container;
      $container = $('#container');
      forum.postListView = new forum.PostListView({
        collection: forum.postList
      });
      forum.postFormView = new forum.PostFormView({
        collection: forum.postList,
        model: forum.currentUser
      });
      return $container.empty().append(forum.postListView.render().el).append(forum.postFormView.render().el);
    };

    return ForumRouter;

  })();

}).call(this);
