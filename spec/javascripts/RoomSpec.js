var roomData, roomResponse, userResponse;

roomData = {
  topic: "Topic for my new Roundtable",
  post: "First post topic for my new Roundtable"
};

roomResponse = "";

userResponse = "{\"created_at\":\"2011-11-18T23:35:07Z\",\"id\":1,\"updated_at\":\"2011-11-18T23:35:07Z\",\"username\":\"Hursh\"}";

describe("room", function() {
  beforeEach(function() {
    var roomListLength;
    roomListLength = forum.roomList.length;
    return forum.currentUser.set(userData);
  });
  describe("room model", function() {
    return beforeEach(function() {
      return this.room = new forum.Room(roomData[0]);
    });
  });
  describe("room view", function() {
    beforeEach(function() {
      return $('#new-room-button').click();
    });
    it("should render room form when new roundtable is clicked", function() {
      return expect($('.new-room-form').length).toBe(1);
    });
    it("should have roomList as a collection", function() {
      return expect(forum.newRoomView.collection.constructor.name).toBe("RoomList");
    });
    return it("should contain a topic and first post field", function() {
      return expect($('.new-room-form textarea').length).toBe(2);
    });
  });
  return describe("making new rooms", function() {
    beforeEach(function() {
      sinon.spy($, 'ajax');
      this.server = sinon.fakeServer.create();
      $('#new-room-button').click();
      $('.new-room.form topic').val(roomData.topic);
      $('.new-room.form post').val(roomData.post);
      $('.new-room.form submit').click();
      this.server.respondWith([
        200, {
          "Content-Type": "application/json"
        }, roomResponse
      ]);
      return this.server.respond();
    });
    afterEach(function() {
      $.ajax.restore();
      return this.server.restore();
    });
    it('should create a new room entry', function() {
      return expect(forum.roomList.length).toBe(roomListLength + 1);
    });
    it('should make a room entry with the right topic', function() {
      return expect(forum.roomList.last().toJSON().topic).toEqual(roomData.topic);
    });
    return it('should make a post entry with the right contents', function() {
      return expect(forum.postList.last().toJSON().content).toEqual(roomData.post);
    });
  });
});
