
  window.forum = {};

  $(function() {
    return $.ajaxSetup({
      beforeSend: function(xhr) {
        return xhr.setRequestHeader("X-CSRF-Token", $("meta[name=\"csrf-token\"]").attr("content"));
      }
    });
  });

  Backbone.emulateHTTP = true;
