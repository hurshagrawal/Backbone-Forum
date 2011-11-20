
  window.forum = {};

  _.templateSettings = {
    evaluate: /\{\{\{([\s\S]+?)\}\\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g,
    escape: /\{\{\-([\s\S]+?)\}\}/g
  };

  $(function() {
    return $.ajaxSetup({
      beforeSend: function(xhr) {
        return xhr.setRequestHeader("X-CSRF-Token", $("meta[name=\"csrf-token\"]").attr("content"));
      }
    });
  });

  Backbone.emulateHTTP = true;
