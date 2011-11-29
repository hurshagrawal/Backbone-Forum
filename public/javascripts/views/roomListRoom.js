(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  forum.RoomListRoomView = (function() {

    __extends(RoomListRoomView, Backbone.View);

    function RoomListRoomView() {
      this.showRoom = __bind(this.showRoom, this);
      this.render = __bind(this.render, this);
      RoomListRoomView.__super__.constructor.apply(this, arguments);
    }

    RoomListRoomView.prototype.tagName = 'li';

    RoomListRoomView.prototype.className = 'post span10';

    RoomListRoomView.prototype.events = {
      'click .go': 'showRoom'
    };

    RoomListRoomView.prototype.initialize = function() {
      return this.model.bind('change', this.render);
    };

    RoomListRoomView.prototype.render = function() {
      var renderedContent;
      renderedContent = JST['roomListRoom'](this.model.toJSON());
      $(this.el).html(renderedContent);
      return this;
    };

    RoomListRoomView.prototype.showRoom = function() {
      return forum.app.navigate("show/room/" + (this.model.get('id')), true);
    };

    return RoomListRoomView;

  })();

}).call(this);
