(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  forum.PostFormView = (function() {

    __extends(PostFormView, Backbone.View);

    function PostFormView() {
      this.submit = __bind(this.submit, this);
      this.render = __bind(this.render, this);
      PostFormView.__super__.constructor.apply(this, arguments);
    }

    PostFormView.prototype.tagName = 'div';

    PostFormView.prototype.className = 'post-form';

    PostFormView.prototype.events = {
      'click .post-form button': 'submit'
    };

    PostFormView.prototype.initialize = function() {
      this.collection.bind('reset', this.render);
      this.collection.bind('add', this.render);
      return this.model.bind('change', this.render);
    };

    PostFormView.prototype.render = function() {
      if (this.model.get('username') != null) {
        $(this.el).html(JST['postForm']());
      } else {
        $(this.el).html('');
      }
      this.delegateEvents();
      return this;
    };

    PostFormView.prototype.submit = function() {
      return this.collection.create({
        username: this.model.get('username'),
        content: this.$('textarea').val()
      });
    };

    return PostFormView;

  })();

}).call(this);
