(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  forum.PostView = (function() {

    __extends(PostView, Backbone.View);

    function PostView() {
      this.render = __bind(this.render, this);
      PostView.__super__.constructor.apply(this, arguments);
    }

    PostView.prototype.tagName = 'li';

    PostView.prototype.className = 'post';

    PostView.prototype.initialize = function() {
      return this.model.bind('change', this.render);
    };

    PostView.prototype.render = function() {
      var renderedContent;
      renderedContent = JST['post'](this.model.toJSON());
      $(this.el).html(renderedContent);
      return this;
    };

    return PostView;

  })();

}).call(this);
