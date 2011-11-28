(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  forum.Navigation = (function() {

    __extends(Navigation, Backbone.View);

    function Navigation() {
      this.showHome = __bind(this.showHome, this);
      this.render = __bind(this.render, this);
      Navigation.__super__.constructor.apply(this, arguments);
    }

    Navigation.prototype.tagName = 'section';

    Navigation.prototype.className = 'navigation';

    Navigation.prototype.events = {
      'click .home': 'showHome'
    };

    Navigation.prototype.initialize = function() {
      return forum.currentUserView = new forum.UserView({
        model: forum.currentUser
      });
    };

    Navigation.prototype.render = function() {
      var renderedContent;
      renderedContent = JST['navigation']();
      $(this.el).html(renderedContent).append(forum.currentUserView.render().el);
      return this;
    };

    Navigation.prototype.showHome = function() {
      return forum.app.navigate('', true);
    };

    return Navigation;

  })();

}).call(this);
