(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  forum.RoomListView = (function() {

    __extends(RoomListView, Backbone.View);

    function RoomListView() {
      this.render = __bind(this.render, this);
      RoomListView.__super__.constructor.apply(this, arguments);
    }

    RoomListView.prototype.tagName = 'section';

    RoomListView.prototype.className = 'rooms';

    RoomListView.prototype.initialize = function() {
      this.collection.bind('reset', this.render);
      return this.collection.bind('add', this.render);
    };

    RoomListView.prototype.render = function() {
      var $postList;
      var _this = this;
      $(this.el).html(JST['roomList']());
      $postList = this.$('.room-list');
      this.collection.each(function(room) {
        var view;
        view = new forum.RoomListRoomView({
          model: room,
          collection: _this.collection
        });
        return $postList.append(view.render().el);
      });
      return this;
    };

    return RoomListView;

  })();

}).call(this);
