(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  forum.ForumRouter = (function() {

    __extends(ForumRouter, Backbone.Router);

    function ForumRouter() {
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

    ForumRouter.prototype.home = function() {
      return $(function() {
        var $container;
        if (this.toAnimate === true) {
          $container = $('<div class="slide leftside"></div>').appendTo('.container.main');
        } else {
          $container = $("#container");
        }
        forum.roomListView = new forum.RoomListView({
          collection: forum.roomList
        });
        if (this.toAnimate !== true) $container.empty();
        $container.append(forum.roomListView.render().el);
        if (this.toAnimate === true) {
          $('.center').addClass('rightside').removeClass('center').removeAttr('id');
          $('.leftside').attr('id', 'container');
          window.setTimeout((function() {
            return $('.leftside').addClass('center').removeClass('leftside');
          }), 0);
          window.setTimeout((function() {
            return $('.rightside').remove();
          }), 500);
        }
        return this.toAnimate = true;
      });
    };

    ForumRouter.prototype.showRoom = function(room_id) {
      return $(function() {
        var $container, postList, room;
        var _this = this;
        if (this.toAnimate === true) {
          $container = $('<div class="slide rightside"></div>').appendTo('.container.main');
        } else {
          $container = $("#container");
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
        if (this.toAnimate !== true) $container.empty();
        $container.append(forum.postListView.render().el).append(forum.postFormView.render().el);
        if (this.toAnimate) {
          $('.sidebar').addClass('slide').css('left', '-1500px');
          $('.center').addClass('leftside').removeClass('center').removeAttr('id');
          $('.rightside').attr('id', 'container');
          window.setTimeout((function() {
            return $('.rightside').addClass('center').removeClass('rightside');
          }), 0);
          window.setTimeout((function() {
            return $('.leftside').remove();
          }), 500);
        }
        return this.toAnimate = true;
      });
    };

    ForumRouter.prototype.showNew = function() {
      forum.newRoomView = new forum.NewRoomView({
        collection: forum.roomList
      });
      $('#container').empty().append(forum.newRoomView.render().el);
      return this.toAnimate = true;
    };

    return ForumRouter;

  })();

}).call(this);
