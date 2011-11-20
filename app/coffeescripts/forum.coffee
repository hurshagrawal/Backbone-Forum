# make top-level forum object
window.forum = {}

# change template settings to be more like mustache.js
_.templateSettings = {
	evaluate    : /\{\{\{([\s\S]+?)\}\\}/g,
	interpolate : /\{\{([\s\S]+?)\}\}/g,
	escape      : /\{\{\-([\s\S]+?)\}\}/g
};

# to ensure rails doesn't reset the session - CSRF token in headers
$ ->
	$.ajaxSetup beforeSend: (xhr) ->
		xhr.setRequestHeader "X-CSRF-Token", $("meta[name=\"csrf-token\"]").attr("content")

# emulates PUT and DELETE REST actions as POST + _method param
Backbone.emulateHTTP = true
