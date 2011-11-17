/* DO NOT MODIFY. This file was compiled Thu, 17 Nov 2011 21:52:47 GMT from
 * /Users/Hursh/roundtable/forum/app/coffeescripts/forum.coffee
 */

(function() {
  var forum;

  forum = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function() {
      new Forum.Routers.Tasks();
      return Backbone.history.start();
    }
  };

}).call(this);
