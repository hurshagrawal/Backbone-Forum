
  window.forum = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function(posts) {
      new Forum.Routers.Posts();
      this.tasks = new Forum.Collections.Posts(posts);
      return Backbone.history.start();
    }
  };
