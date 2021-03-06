'use strict'

sfServices = angular.module("sfServices", ["ngResource"])

sfServices.factory "urlChooser", ["$location", ($location) ->

  switch $location.host()
    when "127.0.0.1"
      env = "development"
    when "starkey.local"
      env = "staging"
    else
      env = "production"

  getUrl = ->
    switch env
      when "development"
        "/local/api"
      when "staging"
        "http://starkey.local/api"
      else
        "/api"
  getIndexFormat = ->
    if env is "development" then "/index.json" else ""

  getDetailFormat = (id)->
    if env is "development" then "" else "/#{id}"
  {
    getUrl: getUrl()
    getIndexFormat: getIndexFormat()
  }
]

sfServices.factory "Article", ["$q", "$http", "urlChooser", ($q, $http, urlChooser) ->

  getDetail = (id) ->
    deferred = $q.defer()

    $http.get("#{urlChooser.getUrl}/articles/#{id}").success( (data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason
    deferred.promise
  {getDetail: getDetail}
]

sfServices.factory "Articles", ["$q", "$http", "$resource", "urlChooser", ($q, $http, $resource, urlChooser) ->

  getIndex = ->
    deferred = $q.defer()

    $http.get("#{urlChooser.getUrl}/blog#{urlChooser.getIndexFormat}").success( (data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason

    deferred.promise

  # Return factory object
  {getIndex: getIndex}
]

sfServices.factory "LatestBlog", ["$q", "$http", "urlChooser", ($q, $http, urlChooser) ->

  fetchLatest = ->
    endPoint = "#{urlChooser.getUrl}/latest_blog"
    deferred = $q.defer()

    $http.get(endPoint).success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason

    deferred.promise

  {fetchLatest: fetchLatest}
]

sfServices.factory("$FB", [
  "$window"
  ($window) ->
    return init: (fbId) ->
      if fbId
        @fbId = fbId
        $window.fbAsyncInit = ->
          FB.init
            appId: fbId
            channelUrl: "app/channel.html"
            status: true
            xfbml: true
          return

        ((d) ->
          js = undefined
          id = "facebook-jssdk"
          ref = d.getElementsByTagName("script")[0]
          return  if d.getElementById(id)
          js = d.createElement("script")
          js.id = id
          js.async = true
          js.src = "//connect.facebook.net/en_US/all.js"
          ref.parentNode.insertBefore js, ref
          return
        ) document
      else
        throw ("FB App Id Cannot be blank")
      return
])

sfServices.factory "FeaturedArticle", ["$q", "$http", "$resource", "urlChooser", ($q, $http, $resource, urlChooser) ->

  getIndex = ->
    deferred = $q.defer()
    $http.get("#{urlChooser.getUrl}/featured_articles#{urlChooser.getIndexFormat}").success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason

    deferred.promise

  {getIndex: getIndex}
]

sfServices.factory "GalaItems", ["$q", "$http", "$resource", "urlChooser", ($q, $http, $resource, urlChooser) ->

  getIndex = ->
    deferred = $q.defer()
    $http.get("#{urlChooser.getUrl}/gala_items").success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason
    deferred.promise

  {getIndex: getIndex}
]

sfServices.factory "GalaTabs", ["$q", "$http", "$resource", "urlChooser", ($q, $http, $resource, urlChooser) ->

  getIndex = ->
    deferred = $q.defer()
    $http.get("#{urlChooser.getUrl}/gala_tabs").success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason
    deferred.promise

  {getIndex: getIndex}
]

sfServices.factory "HearingMissionArticle", ["$q", "$http", "urlChooser", ($q, $http, urlChooser) ->

  getDetail = (id) ->
    deferred = $q.defer()

    $http.get("#{urlChooser.getUrl}/missions_articles/#{id}").success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason
    deferred.promise
  {getDetail: getDetail}
]

sfServices.factory "Instagram", [
  "$http"
  ($http) ->
    {
      fetchLatest: (callback) ->
        endPoint = "https://api.instagram.com/v1/users/331318543/media/recent/?client_id=1f359684e8ab4da6ae6ff618be26c638&callback=JSON_CALLBACK&count=4"
        $http.jsonp(endPoint).success (response) ->
          callback response.data}
]

sfServices.factory "MapMarker", ["$q", "$http", "$resource", "urlChooser", ($q, $http, $resource, urlChooser) ->

  getIndex = ->
    deferred = $q.defer()
    $http.get("#{urlChooser.getUrl}/homepage_markers#{urlChooser.getIndexFormat}").success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason

    deferred.promise

  # Return factory object
  {getIndex: getIndex}
]

sfServices.factory "MissionsPage", ["$q", "$http", "$resource", "urlChooser", ($q, $http, $resource, urlChooser) ->

  getPage = ->
    deferred = $q.defer()
    $http.get("#{urlChooser.getUrl}/missions_page#{urlChooser.getIndexFormat}").success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason
    deferred.promise
  {getPage: getPage}
]

sfServices.factory "MissionsIndex", ["$q", "$http", "$resource", "urlChooser", ($q, $http, $resource, urlChooser) ->

  getIndex = ->
    deferred = $q.defer()
    url = "#{urlChooser.getUrl}/missions_highlights#{urlChooser.getIndexFormat}"
    $http.get(url).success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason
    deferred.promise
  {getIndex: getIndex}
]

sfServices.factory "MissionsMapMarker", ["$q", "$http", "$resource", "urlChooser", ($q, $http, $resource, urlChooser) ->

  getIndex = ->
    deferred = $q.defer()
    $http.get("#{urlChooser.getUrl}/missions_markers#{urlChooser.getIndexFormat}").success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason

    deferred.promise

  # Return factory object
  {getIndex: getIndex}
]


sfServices.factory "MediaMentionOrPressItem", ["$q", "$http", "$resource", "urlChooser", ($q, $http, $resource, urlChooser) ->

  getIndex = ->
    deferred = $q.defer()
    $http.get("#{urlChooser.getUrl}/press#{urlChooser.getIndexFormat}").success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason

    deferred.promise

  # Return factory object
  {getIndex: getIndex}
]

sfServices.factory "PressRelease", ["$resource", "urlChooser", ($resource, urlChooser) ->
  $resource "#{urlChooser.getUrl}/press_releases/:pressReleaseId.json", {}, {}
]

sfServices.factory "Preview", ["$q", "$http", "urlChooser", ($q, $http, urlChooser) ->

  getDetail = (id) ->
    deferred = $q.defer()

    $http.get("#{urlChooser.getUrl}/preview/#{id}").success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason
    deferred.promise
  {getDetail: getDetail}
]
sfServices.factory "MediaMention", ["$resource", "urlChooser", ($resource, urlChooser) ->
  $resource "#{urlChooser.getUrl}/media_mentions/:mediaMentionId.json", {}, {}
]


sfServices.factory "ProgramContent", ["$q", "$http", "urlChooser", ($q, $http, urlChooser) ->
  getResource = (programContentId)->
    deferred = $q.defer()
    $http.get("#{urlChooser.getUrl}/program_#{programContentId}").success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason
    deferred.promise
  {getResource: getResource}
]

sfServices.factory "ProgramPartnership", ["$q", "$http", "urlChooser", ($q, $http, urlChooser) ->
  getIndex = ->
    deferred = $q.defer()
    $http.get("#{urlChooser.getUrl}/program_partnerships#{urlChooser.getIndexFormat}").success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason
    deferred.promise
  {getIndex: getIndex}
]

sfServices.factory "ProgramResource", ["$q", "$http", "urlChooser", ($q, $http, urlChooser) ->
  getIndex = ->
    deferred = $q.defer()
    $http.get("#{urlChooser.getUrl}/program_resources#{urlChooser.getIndexFormat}").success((data) ->
      deferred.resolve data
    ).error (reason) ->
      deferred.reject reason
    deferred.promise
  {getIndex: getIndex}
]

sfServices.service("Youtube", [->
  regex = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
  regex: ->
    regex
])