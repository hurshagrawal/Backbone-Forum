(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  forum.Room = (function() {

    __extends(Room, Backbone.Model);

    function Room() {
      Room.__super__.constructor.apply(this, arguments);
    }

    return Room;

  })();

  forum.RoomList = (function() {

    __extends(RoomList, Backbone.Collection);

    function RoomList() {
      RoomList.__super__.constructor.apply(this, arguments);
    }

    RoomList.prototype.model = forum.Room;

    RoomList.prototype.url = '/db/rooms';

    return RoomList;

  })();

  /*
  #	View for each room entry in the room list
  #
  */

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
      var modelObj, renderedContent;
      modelObj = this.model.toJSON();
      modelObj.subheading = this.toSentence(modelObj.participants);
      modelObj.dateStr = this.toDateString(modelObj.created_at);
      renderedContent = JST['roomListRoom'](modelObj);
      $(this.el).html(renderedContent);
      return this;
    };

    RoomListRoomView.prototype.showRoom = function() {
      var elementWidth, targetLeft;
      if (forum.roomSideView != null) {
        return forum.sideRoom.set(this.model.toJSON());
      } else {
        forum.sideRoom = new forum.Room(this.model.toJSON());
        forum.roomSideView = new forum.RoomSideView({
          model: forum.sideRoom
        });
        $('#container').append(forum.roomSideView.render().el);
        elementWidth = $(forum.roomSideView.el).width();
        targetLeft = $('.side-bg').offset().left - 20 - elementWidth;
        $(forum.roomSideView.el).css('left', targetLeft);
        return forum.roomSideView.trigger('slideOut');
      }
    };

    RoomListRoomView.prototype.toSentence = function(arr) {
      var arrClone, lastEntry;
      if (arr.length === 1) return "with " + arr[0];
      if (arr.length === 2) return "between " + (arr.join(" and "));
      arrClone = arr.slice(0);
      lastEntry = arrClone.splice(arrClone.length - 1);
      return "between " + (arrClone.join(', ')) + ", and " + lastEntry;
    };

    RoomListRoomView.prototype.toDateString = function(dateStr) {
      var date, str;
      date = new Date(dateStr);
      str = "" + (date.getHours()) + ":" + (date.getMinutes()) + " ";
      str += "" + (date.getDate()) + "/" + (date.getMonth()) + "/";
      str += "" + (date.getFullYear().toString().substr(2, 2));
      return str;
    };

    return RoomListRoomView;

  })();

  /*
  # View for sidebar on right of room list
  #
  */

  forum.RoomSideView = (function() {

    __extends(RoomSideView, Backbone.View);

    function RoomSideView() {
      this.showRoom = __bind(this.showRoom, this);
      this.slideIn = __bind(this.slideIn, this);
      this.slideOut = __bind(this.slideOut, this);
      this.render = __bind(this.render, this);
      RoomSideView.__super__.constructor.apply(this, arguments);
    }

    RoomSideView.prototype.className = 'section sidebar span6';

    RoomSideView.prototype.events = {
      'click .close': 'slideIn',
      'click .go': 'showRoom'
    };

    RoomSideView.prototype.initialize = function() {
      this.model.bind('change', this.render);
      this.bind('slideIn', this.slideIn);
      return this.bind('slideOut', this.slideOut);
    };

    RoomSideView.prototype.render = function() {
      var modelObj, renderedContent;
      var _this = this;
      modelObj = this.model.toJSON();
      modelObj.posts = forum.postList.select(function(entry) {
        return entry.get('room_id') === _this.model.get('id');
      });
      modelObj.firstPost = this.truncatePost(modelObj.posts[0].get('content'), 95);
      if (modelObj.posts.length > 1) {
        modelObj.secondPost = this.truncatePost(modelObj.posts[1].get('content'), 35);
      }
      renderedContent = JST['roomSideView'](modelObj);
      $(this.el).html(renderedContent);
      if (this.displayed === false && this.displayed !== null) this.slideOut();
      return this;
    };

    RoomSideView.prototype.slideOut = function() {
      $(this.el).css('visibility', 'visible').animate({
        left: "+=" + ($(this.el).width())
      }, 200);
      return this.displayed = true;
    };

    RoomSideView.prototype.slideIn = function() {
      var _this = this;
      $(this.el).animate({
        left: "-=" + ($(this.el).width())
      }, 200, function() {
        return $(_this.el).css('visibility', 'hidden');
      });
      return this.displayed = false;
    };

    RoomSideView.prototype.showRoom = function() {
      forum.app.navigate("show/room/" + (this.model.get('id')), true);
      return forum.roomSideView = null;
    };

    RoomSideView.prototype.truncatePost = function(str, length) {
      var arr;
      if (str.length <= length) return str;
      arr = str.substr(0, length).split(" ");
      arr.splice(arr.length - 1, 1);
      return arr.join(" ") + "...";
    };

    return RoomSideView;

  })();

  /*
  #	View for room list on main page
  #
  */

  forum.RoomListView = (function() {

    __extends(RoomListView, Backbone.View);

    function RoomListView() {
      this.render = __bind(this.render, this);
      RoomListView.__super__.constructor.apply(this, arguments);
    }

    RoomListView.prototype.className = 'list';

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

  /*
  #	View for creating a Roundtable page
  #
  */

  forum.NewRoomView = (function() {

    __extends(NewRoomView, Backbone.View);

    function NewRoomView() {
      this.submit = __bind(this.submit, this);
      this.render = __bind(this.render, this);
      NewRoomView.__super__.constructor.apply(this, arguments);
    }

    NewRoomView.prototype.className = 'section new-room-form';

    NewRoomView.prototype.events = {
      'click .submit': 'submit'
    };

    NewRoomView.prototype.initialize = function() {};

    NewRoomView.prototype.render = function() {
      $(this.el).html(JST['newRoom']());
      return this;
    };

    NewRoomView.prototype.submit = function() {
      var postText, room, topicText;
      var _this = this;
      topicText = this.$('.topic-text').val().trim();
      postText = this.$('.post-text').val().trim();
      $('.error').removeClass('error');
      if (topicText === "") this.$('.topic-text').addClass('error');
      if (postText === "") this.$('.post-text').addClass('error');
      if (topicText === "" || postText === "") return;
      return room = this.collection.create({
        room: {
          user_id: forum.currentUser.get('id'),
          topic: topicText
        }
      }, {
        success: function() {
          var post;
          room.set({
            username: forum.currentUser.get('username')
          });
          room.collection = new forum.PostList();
          return post = room.collection.create({
            post: {
              room_id: room.get('id'),
              user_id: forum.currentUser.get('id'),
              content: postText
            }
          }, {
            success: function() {
              forum.postList.add(post);
              post.set({
                username: forum.currentUser.get('username')
              });
              return forum.app.navigate("show/room/" + (room.get('id')), true);
            }
          });
        }
      });
    };

    return NewRoomView;

  })();

}).call(this);
