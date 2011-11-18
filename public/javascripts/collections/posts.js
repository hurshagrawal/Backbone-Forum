(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  forum.Posts = (function() {

    __extends(Posts, Backbone.Collection);

    function Posts() {
      Posts.__super__.constructor.apply(this, arguments);
    }

    Posts.prototype.model = forum.Post;

    Posts.prototype.url = '/posts';

    return Posts;

  })();

}).call(this);
