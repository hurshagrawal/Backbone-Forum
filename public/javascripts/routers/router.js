(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  forum.ForumRouter = (function() {

    __extends(ForumRouter, Backbone.Router);

    function ForumRouter() {
      this.showNew = __bind(this.showNew, this);
      this.showRoom = __bind(this.showRoom, this);
      this.home = __bind(this.home, this);
      this.startAnimation = __bind(this.startAnimation, this);
      this.prepareAnimation = __bind(this.prepareAnimation, this);
      ForumRouter.__super__.constructor.apply(this, arguments);
    }

    ForumRouter.prototype.routes = {
      '': 'home',
      'show/room/:room_id': 'showRoom',
      'show/new': 'showNew'
    };

    ForumRouter.prototype.initialize = function() {
      forum.currentUser = new forum.User();
      forum.navigation = new forum.Navigation();
      $('.topbar').append(forum.navigation.render().el);
      forum.postList = new forum.PostList();
      return forum.roomList = new forum.RoomList();
    };

    ForumRouter.prototype.prepareAnimation = function(from) {
      var fromSide;
      fromSide = from === 'left' ? 'leftside' : 'rightside';
      if (this.toAnimate === true) {
        return $("<div class='slide " + fromSide + "'></div>").appendTo('.container.main');
      } else {
        return $("#container");
      }
    };

    ForumRouter.prototype.startAnimation = function(direction) {
      var fromSide, toSide;
      fromSide = "" + (direction === 'left' ? 'right' : 'left') + "side";
      toSide = "" + direction + "side";
      $("html:not(:animated),body:not(:animated)").animate({
        scrollTop: 0
      }, 200);
      $('.sidebar').addClass('slide').css('left', '-1500px');
      $('.center').addClass(toSide).removeClass('center').removeAttr('id');
      $("." + fromSide).attr('id', 'container');
      window.setTimeout(function() {
        return $("." + fromSide).addClass('center').removeClass("" + fromSide);
      }, 0);
      return window.setTimeout((function() {
        return $("." + toSide).remove();
      }), 500);
    };

    ForumRouter.prototype.home = function() {
      var _this = this;
      return $(function() {
        var $container;
        $container = _this.prepareAnimation('left');
        forum.roomListView = new forum.RoomListView({
          collection: forum.roomList
        });
        if (_this.toAnimate !== true) $container.empty();
        $container.append(forum.roomListView.render().el);
        if (_this.toAnimate === true) _this.startAnimation('right');
        return _this.toAnimate = true;
      });
    };

    ForumRouter.prototype.showRoom = function(room_id) {
      var _this = this;
      return $(function() {
        var $container, postList, room;
        if (forum.animateDirection != null) {
          $container = _this.prepareAnimation(forum.animateDirection.from);
        } else {
          $container = _this.prepareAnimation('right');
        }
        room = forum.roomList.get(room_id);
        postList = forum.postList.select(function(entry) {
          return entry.get('room_id') === room.get('id');
        });
        room.collection = new forum.PostList(postList);
        forum.postListView = new forum.PostListView({
          collection: room.collection,
          model: room
        });
        forum.postFormView = new forum.PostFormView({
          collection: room.collection,
          model: room
        });
        if (_this.toAnimate !== true) $container.empty();
        $container.append(forum.postListView.render().el).append(forum.postFormView.render().el);
        if (_this.toAnimate === true) {
          if (forum.animateDirection != null) {
            _this.startAnimation(forum.animateDirection.to);
            forum.animateDirection = null;
          } else {
            _this.startAnimation('left');
          }
        }
        return _this.toAnimate = true;
      });
    };

    ForumRouter.prototype.showNew = function() {
      var $container;
      $container = this.prepareAnimation('right');
      forum.newRoomView = new forum.NewRoomView({
        collection: forum.roomList
      });
      $container.append(forum.newRoomView.render().el);
      if (this.toAnimate === true) this.startAnimation('left');
      return this.toAnimate = true;
    };

    return ForumRouter;

  })();

}).call(this);
