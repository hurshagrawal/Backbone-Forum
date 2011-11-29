(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  forum.NewRoomView = (function() {

    __extends(NewRoomView, Backbone.View);

    function NewRoomView() {
      this.submit = __bind(this.submit, this);
      this.render = __bind(this.render, this);
      NewRoomView.__super__.constructor.apply(this, arguments);
    }

    NewRoomView.prototype.tagName = 'div';

    NewRoomView.prototype.className = 'new-room-form';

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
