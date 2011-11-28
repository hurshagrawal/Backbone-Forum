(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  forum.PostListView = (function() {

    __extends(PostListView, Backbone.View);

    function PostListView() {
      this.render = __bind(this.render, this);
      PostListView.__super__.constructor.apply(this, arguments);
    }

    PostListView.prototype.tagName = 'section';

    PostListView.prototype.className = 'post-list';

    PostListView.prototype.initialize = function() {
      this.collection.bind('reset', this.render);
      return this.collection.bind('add', this.render);
    };

    PostListView.prototype.render = function() {
      var $postList;
      var _this = this;
      $(this.el).html(JST['postList']({
        topic: this.model.get('topic')
      }));
      $postList = this.$('.post-list');
      this.collection.each(function(post) {
        var view;
        view = new forum.PostView({
          model: post,
          collection: _this.collection
        });
        return $postList.append(view.render().el);
      });
      return this;
    };

    return PostListView;

  })();

}).call(this);
