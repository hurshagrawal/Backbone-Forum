var roomData;

roomData = [];

describe("room", function() {
  return describe("room model", function() {
    return beforeEach(function() {
      return this.room = new forum.Room(roomData[0]);
    });
  });
});
