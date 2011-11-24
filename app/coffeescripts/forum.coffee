# make top-level forum object
window.forum = {}

# to ensure rails doesn't reset the session - CSRF token in headers
$ ->
	$.ajaxSetup beforeSend: (xhr) ->
		xhr.setRequestHeader "X-CSRF-Token", $("meta[name=\"csrf-token\"]").attr("content")

# emulates PUT and DELETE REST actions as POST + _method param
Backbone.emulateHTTP = true
