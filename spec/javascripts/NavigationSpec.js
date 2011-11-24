
describe('navigation', function() {
  return it("should render room form when new roundtable is clicked", function() {
    $('#new-room-button').click();
    return expect($('#new-room-form')).toBe(1);
  });
});
