
  window.forum = {
    init: function(posts) {
      new Forum.Routers.Posts();
      this.tasks = new Forum.Collections.Posts(posts);
      return Backbone.history.start();
    }
  };

  _.templateSettings = {
    evaluate: /\{\{\{([\s\S]+?)\}\\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g,
    escape: /\{\{\-([\s\S]+?)\}\}/g
  };
