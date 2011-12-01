(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  forum.User = (function() {

    __extends(User, Backbone.Model);

    function User() {
      User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.url = '/db/users';

    return User;

  })();

  /*
  #	User login/signup/create a new roundtable link in topbar
  #
  */

  forum.UserView = (function() {

    __extends(UserView, Backbone.View);

    function UserView() {
      this.showNewForm = __bind(this.showNewForm, this);
      this.render = __bind(this.render, this);
      UserView.__super__.constructor.apply(this, arguments);
    }

    UserView.prototype.tagName = 'span';

    UserView.prototype.className = 'user-panel pull-right';

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
      var newUser, un;
      var _this = this;
      un = this.$('.un').val().pw = this.$('.pw').val();
      if (un.trim() === "" || pw.trim() === "") return;
      newUser = new forum.User({
        username: un,
        password: pw
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
      $.post('/db/sessions', {
        '_method': 'delete'
      }, function(response) {
        return _this.model.clear();
      });
      return forum.app.navigate('', true);
    };

    UserView.prototype.showNewForm = function() {
      return forum.app.navigate('show/new', true);
    };

    return UserView;

  })();

}).call(this);
