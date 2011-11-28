(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  forum.UserView = (function() {

    __extends(UserView, Backbone.View);

    function UserView() {
      this.showNewForm = __bind(this.showNewForm, this);
      this.render = __bind(this.render, this);
      UserView.__super__.constructor.apply(this, arguments);
    }

    UserView.prototype.tagName = 'div';

    UserView.prototype.className = 'user-panel';

    UserView.prototype.events = {
      'click #signup-button': 'signup',
      'click #login-button': 'login',
      'click #logout-button': 'logout',
      'click #new-room-button': 'showNewForm'
    };

    UserView.prototype.initialize = function() {
      return this.model.bind('change', this.render);
    };

    UserView.prototype.render = function() {
      var renderedContent;
      if (this.model.get('username') != null) {
        renderedContent = JST['user'](this.model.toJSON());
      } else {
        renderedContent = JST['login'](this.model.toJSON());
      }
      $(this.el).html(renderedContent);
      return this;
    };

    UserView.prototype.signup = function() {
      var newUser;
      var _this = this;
      newUser = new forum.User({
        username: this.$('.un').val(),
        password: this.$('.pw').val()
      });
      return newUser.save({}, {
        success: function(mode, data) {
          if (data.exists === true) {
            _this.render();
            return _this.$('.alert-text').html('That username is taken');
          } else {
            return _this.model.set(data);
          }
        },
        error: function(object, error) {
          return _this.$('.alert-text').html('There was some sort of error. Try again.');
        }
      });
    };

    UserView.prototype.login = function() {
      var data;
      var _this = this;
      data = {
        username: this.$('.un').val(),
        password: this.$('.pw').val()
      };
      return $.post('/db/sessions', data, function(response) {
        if (response.exists === true) {
          return _this.model.set(response.user);
        } else if (response.exists === false) {
          _this.render();
          return _this.$('.alert-text').html('Username or password is incorrect');
        } else {
          return _this.$('.alert-text').html('There was some sort of error. Try again.');
        }
      });
    };

    UserView.prototype.logout = function() {
      var _this = this;
      return $.post('/db/sessions', {
        '_method': 'delete'
      }, function(response) {
        return _this.model.clear();
      });
    };

    UserView.prototype.showNewForm = function() {
      return forum.app.navigate('show/new', true);
    };

    return UserView;

  })();

}).call(this);
