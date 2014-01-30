sfDirectives = angular.module("sfDirectives", ["ngSanitize", "sfFilters"])

sfDirectives.factory("Pagination", ->
  pagination = {}
  pagination.getNew = (perPage) ->
    perPage = (if perPage is `undefined` then 5 else perPage)
    paginator =
      numPages: 1
      perPage: perPage
      page: 0

    paginator.prevPage = ->
      paginator.page -= 1  if paginator.page > 0

    paginator.nextPage = ->
      paginator.page += 1  if paginator.page < paginator.numPages - 1

    paginator.toPageId = (id) ->
      paginator.page = id  if id >= 0 and id <= paginator.numPages - 1

    paginator

  pagination
)

sfDirectives.directive "worldMap", [->
  link = (scope, element, attrs) ->

    setTimeout( ->
      $("#world-map-gdp").vectorMap
        map: "world_mill_en"
        markers: scope.markers.coords
        markersSelectableOne: true
        zoomOnScroll: false
        series:
          markers: [
            attribute: "fill"
            scale: ["#C8EEFF", "#0071A4"]
          ]

        onMarkerClick: (event, index) =>
          content = scope.markers.meta_data[index]
          $popup = $('#map-popup')
          $popup.fadeOut "slow", ->
            $popup
              .find(".content").empty()
              .html("<span class='close'><a href ng-click='closePopup()'>X</a></span><img src='#{content.thumbnail_url}'/><div class='background-popup'><h1>#{content.title}</h1><p>#{content.text}</p></div>")
            $popup
              .fadeIn()
      mapObject = $("#world-map-gdp").vectorMap("get", "mapObject")
    , 200)

  controller = ($scope, $element) ->
    $scope.closePopup = ->
      $('#map-popup').fadeOut()

  restrict: "E"
  link: link
  controller: controller
  template: "<section class='map'><div id='map-popup'><div class='content'></div></div><div ng-transclude></div><div id='world-map-gdp'></div></section>"
  transclude: true
  replace: true
  scope: {
    markers: "="
  }
]

sfDirectives.directive "panelTab", [->

  template =  """
    <section>
      <div class='panel-image'>
        <a href='{{featured.video_link_url}}' target='_blank'>
          <img ng-src='{{featured.panel_image_url}}'></img>
        </a>
      </div>
      <div class='panel-content'>
        <div>
          <h1>{{featured.panel_title}}</h1>
          <div ng-bind-html="featured.body"></div>
          <p class='call-to-action'>
            <a href='{{featured.panel_call_to_action_link_url}}'>
              {{featured.panel_call_to_action_text}} &rarr;
            </a>
          </p>
        </div>
      </div>
    <section>
    """

  restrict: "E"
  template: template
  replace: true
  scope: {
    featured: "="
  }
]
