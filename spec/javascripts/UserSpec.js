var userData, userResponse;

userData = {
  username: "username",
  password: "password"
};

userResponse = "{\"created_at\":\"2011-11-18T23:35:07Z\",\"id\":1,\"updated_at\":\"2011-11-18T23:35:07Z\",\"username\":\"Hursh\"}";

describe("user", function() {
  beforeEach(function() {
    return forum.currentUser.set({});
  });
  describe("when not logged in", function() {
    describe("user model", function() {
      it("should exist", function() {
        return expect(forum.currentUser).toBeDefined();
      });
      return it("should not have a username", function() {
        return expect(forum.currentUser.get('username')).toBeUndefined();
      });
    });
    return describe("user view", function() {
      return it("should exist", function() {
        var userView;
        userView = $('.topbar .user-panel');
        return expect(userView.length).toNotBe(0);
      });
    });
  });
  describe("signing up", function() {
    beforeEach(function() {
      var form;
      sinon.spy($, 'ajax');
      this.server = sinon.fakeServer.create();
      form = $(forum.currentUserView.el);
      form.find('.un').val(userData.username);
      form.find('.pw').val(userData.password);
      form.find('#signup-button').click();
      this.server.respondWith([
        200, {
          "Content-Type": "application/json"
        }, userResponse
      ]);
      return this.server.respond();
    });
    afterEach(function() {
      $.ajax.restore();
      return this.server.restore();
    });
    it("should switch to the logged in view when signing up", function() {
      return expect($('.topbar #signup-button').length).toBe(0);
    });
    it("should display the user view when signed up", function() {
      return expect($('.topbar .user-text').length).toNotBe(0);
    });
    return it("should log you out when you click logout", function() {
      $('#logout-button').click();
      this.server.respond();
      return expect($('.topbar #signup-button').length).toBe(1);
    });
  });
  return describe("logging in", function() {});
});
