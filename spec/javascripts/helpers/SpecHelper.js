
beforeEach(function() {
  jasmine.getFixtures().fixturesPath = '/app/templates/';
  setFixtures('<div id="topbar"></div><div id="container"></div>');
  return window.JST = {
    post: _.template(readFixtures('post.jst')),
    postList: _.template(readFixtures('postList.jst')),
    postForm: _.template(readFixtures('postForm.jst')),
    login: _.template(readFixtures('login.jst')),
    user: _.template(readFixtures('user.jst'))
  };
});
