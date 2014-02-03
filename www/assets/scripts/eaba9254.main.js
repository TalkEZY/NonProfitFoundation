(function(){var sfControllers;sfControllers=angular.module("sfControllers",[]),sfControllers.controller("HomeIndexBottomTabsCtrl",["$scope","MapMarker","FeaturedArticle",function($scope,MapMarker,FeaturedArticle){return FeaturedArticle.getIndex().then(function(data){return $scope.featuredArticles=data}),MapMarker.getIndex().then(function(data){return $scope.markers=data}),$scope.currentBottomSlideTab=1,$scope.currentTabModel={},$scope.changeCurrentTab=function(tabIndex){return 0===tabIndex?$scope.currentBottomSlideTab=1:($scope.currentBottomSlideTab=2,$scope.currentTabModel=$scope.featuredArticles[tabIndex-1])}}]),sfControllers.controller("BlogIndexCtrl",["$scope","Articles","Pagination",function($scope,Articles,Pagination){return $scope.articles=[],$scope.articleFilters={featured:"false",blog_item_category:""},$scope.articleCategories=[{name:"News",tag:"news"},{name:"Events",tag:"events"},{name:"Hear Now",tag:"hear_now"},{name:"Gala",tag:"gala"},{name:"Films",tag:"films"},{name:"Celebrity",tag:"celebrity"},{name:"Operation Change",tag:"operation_change"},{name:"Hearing Missions",tag:"hearing_missions"},{name:"Listen Carefully",tag:"listen_carefully"}],Articles.getIndex().then(function(data){return $scope.articles=data instanceof Array?data:[data],$scope.pagination=Pagination.getNew(9),$scope.pagination.numPages=Math.ceil($scope.articles.length/$scope.pagination.perPage)}),$scope.numberOfPages=function(){return Math.ceil($scope.articles.length/$scope.pageSize)}}]),sfControllers.controller("BlogShowCtrl",["$scope","$routeParams","Articles","Article","Pagination",function($scope,$routeParams,Articles,Article,Pagination){return $scope.articles=[],Article.get({articleId:$routeParams.articleId},function(article){return $scope.article=article instanceof Array?article[0]:article}),Articles.getIndex().then(function(data){return $scope.articles=data instanceof Array?data:[data],$scope.pagination=Pagination.getNew(9),$scope.pagination.numPages=Math.ceil($scope.articles.length/$scope.pagination.perPage)}),$scope.numberOfPages=function(){return Math.ceil($scope.articles.length/$scope.pageSize)}}]),sfControllers.controller("MediaMentionsIndexCtrl",["$scope","MediaMentionOrPressItem","Pagination",function($scope,MediaMentionOrPressItem,Pagination){return $scope.pressItemFilters={featured:"false"},$scope.pressItems=[],MediaMentionOrPressItem.getIndex().then(function(data){return $scope.pressItems=data,$scope.pagination=Pagination.getNew(9),$scope.pagination.numPages=Math.ceil($scope.pressItems.length/$scope.pagination.perPage)}),$scope.numberOfPages=function(){return Math.ceil($scope.pressItems.length/$scope.pageSize)},$scope.backgroundStyle=function(item){var _ref;return 0===(null!=(_ref=item.quote)?_ref.length:void 0)?{background:"url("+item.thumbnail_image_url+")","background-size":"cover"}:{background:"#5CA5D6"}},$scope.isQuote=function(item){return item.quote.length>0}}]),sfControllers.controller("MediaMentionsShowCtrl",["$scope","$routeParams","PressItem","MediaMentionOrPressItem","Pagination",function($scope,$routeParams,PressItem,MediaMentionOrPressItem,Pagination){return $scope.pressItems=[],PressItem.get({pressItemId:$routeParams.articleId},function(pressItem){return $scope.article=pressItem instanceof Array?pressItem[0]:pressItem}),MediaMentionOrPressItem.getIndex().then(function(data){return $scope.pressItems=data,$scope.pagination=Pagination.getNew(9),$scope.pagination.numPages=Math.ceil($scope.pressItems.length/$scope.pagination.perPage)}),$scope.numberOfPages=function(){return Math.ceil($scope.pressItems.length/$scope.pageSize)}}]),sfControllers.controller("ProgramsCtrl",["$scope","$routeParams","$sce","Articles","ProgramPartnership","ProgramResource","ProgramContent",function($scope,$routeParams,$sce,Articles,ProgramPartnership,ProgramResource,ProgramContent){return $scope.currentTab=$routeParams.tabId,$scope.isVisible=!1,$scope.programPartnerships=[],$scope.programResources=[],$scope.programContent="",$scope.trustedHtml=$sce.trustAsHtml($scope.programContent),ProgramContent.getResource($routeParams.tabId).then(function(data){return $scope.programContent=data}),ProgramPartnership.getIndex().then(function(data){return $scope.programPartnerships=data instanceof Array?data:[data]}),ProgramResource.getIndex().then(function(data){return $scope.programResources=data instanceof Array?data:[data]}),$scope.toggle=function(marker){return marker=!marker,$scope.isVisible=marker}}])}).call(this),function(){var sfDirectives;sfDirectives=angular.module("sfDirectives",["ngSanitize","sfFilters"]),sfDirectives.factory("Pagination",function(){var pagination;return pagination={},pagination.getNew=function(perPage){var paginator;return perPage=void 0===perPage?5:perPage,paginator={numPages:1,perPage:perPage,page:0},paginator.prevPage=function(){return paginator.page>0?paginator.page-=1:void 0},paginator.nextPage=function(){return paginator.page<paginator.numPages-1?paginator.page+=1:void 0},paginator.toPageId=function(id){return id>=0&&id<=paginator.numPages-1?paginator.page=id:void 0},paginator},pagination}),sfDirectives.directive("worldMap",[function(){var controller,link;return link=function(scope){return setTimeout(function(){var mapObject;return $("#world-map-gdp").vectorMap({map:"world_mill_en",markers:scope.markers.coords,markersSelectableOne:!0,zoomOnScroll:!1,series:{markers:[{attribute:"fill",scale:["#C8EEFF","#0071A4"]}]},onMarkerClick:function(event,index){var $popup,content;return content=scope.markers.meta_data[index],$popup=$("#map-popup"),$popup.fadeOut("slow",function(){return $popup.find(".content").empty().html("<span class='close'><a href ng-click='closePopup()'>X</a></span><img src='"+content.thumbnail_url+"'/><div class='background-popup'><h1>"+content.title+"</h1><p>"+content.text+"</p></div>"),$popup.fadeIn()})}}),mapObject=$("#world-map-gdp").vectorMap("get","mapObject")},1800)},controller=function($scope){return $scope.closePopup=function(){return $("#map-popup").fadeOut()}},{restrict:"E",link:link,controller:controller,template:"<section class='map'><div id='map-popup'><div class='content'></div></div><div ng-transclude></div><div id='world-map-gdp'></div></section>",transclude:!0,replace:!0,scope:{markers:"="}}}]),sfDirectives.directive("panelTab",[function(){var template;return template="<section>\n  <div class='panel-image'>\n    <a href='{{featured.video_link_url}}' target='_blank' ng-style=\"{'background-image': 'url(' + featured.panel_image_url + ')'}\">\n    </a>\n  </div>\n  <div class='panel-content'>\n    <div>\n      <h1>{{featured.panel_title}}</h1>\n      <div ng-bind-html=\"featured.body\"></div>\n      <p class='call-to-action' ng-hide=\"featured.panel_call_to_action_link_url==''\">\n        <a href='{{featured.panel_call_to_action_link_url}}'>\n          {{featured.panel_call_to_action_text}} &rarr;\n        </a>\n      </p>\n    </div>\n  </div>\n<section>",{restrict:"E",template:template,replace:!0,scope:{featured:"="}}}]),sfDirectives.directive("homeThumblistNav",[function(){var link,template;return template='<div class=\'thumblist-nav horizontal-only\'>\n  <div>\n     <a href ng-click="clickaction(0)">\n      <div class="image" ng-style="{\'background-image\': \'url(/uploads/home/feature/building_a_better_kibera.jpg)\'}"></div>\n      <div class="content">\n        <h4>Global Hearing Mission</h4>\n        <button>Read Stories &rarr;</button>\n      </div>\n    </a>\n  </div>\n  <div ng-repeat="article in articles">\n    <a href ng-click="clickaction($index+1)">\n      <div class="image" ng-style="{\'background-image\': \'url(\' + article.thumbnail_image_url + \')\'}"></div>\n      <div class="content">\n        <h4 ng-bind="article.thumbnail_title"></h4>\n        <button ng-click="clickaction($index+1)" >{{article.thumbnail_call_to_action_text}} <span ng-hide="article.thumbnail_call_to_action_text==\'\'">&rarr;</span>&nbsp;</button>\n      </div>\n    </a>\n  </div>\n</div>',link=function(scope){var config;return config={showArrows:!1},setTimeout(function(){return scope.pane=$(".thumblist-nav"),scope.pane.jScrollPane(config)},1400)},{restrict:"E",link:link,template:template,repalce:!0,scope:{articles:"=",clickaction:"="}}}]),sfDirectives.directive("thumblistNav",["$timeout",function($timeout){var link;return link=function(scope){var config;return config={showArrows:!1},$timeout(function(){return scope.pane=$(".thumblist-nav"),scope.pane.jScrollPane(config)},2e3)},{restrict:"E",link:link,template:"<div class='thumblist-nav horizontal-only' ng-transclude></div>",transclude:!0,replace:!0}}])}.call(this),function(){var sfFilters;sfFilters=angular.module("sfFilters",[]),sfFilters.filter("startFrom",function(){return function(input,start){return input.slice(+start)}}),sfFilters.filter("range",function(){return function(input,total){var i;for(total=parseInt(total),i=0;total>i;)input.push(i),i++;return input}})}.call(this),function(){var HomePageApp,blogPagesApp,mediaMentionsPagesApp,programsPageApp;blogPagesApp=angular.module("blogPagesApp",["ngRoute","ngAnimate","ngSanitize","ahundredyears.swiper","sfControllers","sfDirectives","sfFilters","sfServices"]),blogPagesApp.config(["$routeProvider",function($routeProvider){return $routeProvider.when("/articles",{templateUrl:"partials/articles/index.html",controller:"BlogIndexCtrl"}).when("/articles/:articleId",{templateUrl:"partials/articles/show.html",controller:"BlogShowCtrl"}).otherwise({redirectTo:"/articles"})}]),mediaMentionsPagesApp=angular.module("mediaMentionsPagesApp",["ngRoute","ngAnimate","ngSanitize","ahundredyears.swiper","sfControllers","sfDirectives","sfFilters","sfServices"]),mediaMentionsPagesApp.config(["$routeProvider",function($routeProvider){return $routeProvider.when("/media_mentions",{templateUrl:"partials/media_mentions/index.html",controller:"MediaMentionsIndexCtrl"}).when("/media_mentions/:articleId",{templateUrl:"partials/media_mentions/show.html",controller:"MediaMentionsShowCtrl"}).otherwise({redirectTo:"/media_mentions"})}]),programsPageApp=angular.module("programsPageApp",["ngRoute","ngAnimate","ahundredyears.swiper","sfControllers","sfDirectives","sfFilters","sfServices"]),programsPageApp.config(["$routeProvider",function($routeProvider){return $routeProvider.when("/programs/:tabId",{templateUrl:function(params){return"partials/programs/"+params.tabId+".html"},controller:"ProgramsCtrl"}).otherwise({redirectTo:"/programs/0"})}]),HomePageApp=angular.module("homePageApp",["ngRoute","ngAnimate","ngSanitize","ahundredyears.swiper","sfControllers","sfDirectives","sfFilters","sfServices"])}.call(this),function(){"use strict";var sfServices;sfServices=angular.module("sfServices",["ngResource"]),sfServices.factory("urlChooser",[function(){var env,getIndexFormat,getUrl,urlChooserInstance;return env="production",urlChooserInstance={},getUrl=function(){switch(env){case"development":return"/local/api";case"staging":return"http://starkey.local/api";default:return"/api"}},getIndexFormat=function(){return"development"===env?"/index.json":""},{getUrl:getUrl(),getIndexFormat:getIndexFormat()}}]),sfServices.factory("Article",["$resource","urlChooser",function($resource,urlChooser){return $resource(""+urlChooser.getUrl+"/blog/:articleId.json",{},{})}]),sfServices.factory("Articles",["$q","$http","$resource","urlChooser",function($q,$http,$resource,urlChooser){var getIndex;return getIndex=function(){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/blog"+urlChooser.getIndexFormat).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getIndex:getIndex}}]),sfServices.factory("FeaturedArticle",["$q","$http","$resource","urlChooser",function($q,$http,$resource,urlChooser){var getIndex;return getIndex=function(){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/featured_articles"+urlChooser.getIndexFormat).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getIndex:getIndex}}]),sfServices.factory("MapMarker",["$q","$http","$resource","urlChooser",function($q,$http,$resource,urlChooser){var getIndex;return getIndex=function(){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/homepage_markers"+urlChooser.getIndexFormat).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getIndex:getIndex}}]),sfServices.factory("MediaMentionOrPressItem",["$q","$http","$resource","urlChooser",function($q,$http,$resource,urlChooser){var getIndex;return getIndex=function(){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/press"+urlChooser.getIndexFormat).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getIndex:getIndex}}]),sfServices.factory("PressItem",["$resource","urlChooser",function($resource,urlChooser){return $resource(""+urlChooser.getUrl+"/press/:pressItemId.json",{},{})}]),sfServices.factory("ProgramContent",["$q","$http","urlChooser",function($q,$http,urlChooser){var getResource;return getResource=function(programContentId){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/program_"+programContentId).success(function(data){return console.debug("returned data",data),deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getResource:getResource}}]),sfServices.factory("ProgramPartnership",["$q","$http","urlChooser",function($q,$http,urlChooser){var getIndex;return getIndex=function(){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/program_partnerships"+urlChooser.getIndexFormat).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getIndex:getIndex}}]),sfServices.factory("ProgramResource",["$q","$http","urlChooser",function($q,$http,urlChooser){var getIndex;return getIndex=function(){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/program_resources"+urlChooser.getIndexFormat).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getIndex:getIndex}}])}.call(this),function(){var HeaderTabNav,ProgramsPageView,TabBehavior,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};TabBehavior=function(){function TabBehavior(){this.setActiveLink=__bind(this.setActiveLink,this),this.setupListeners()}return TabBehavior.prototype.rootElement=$(document),TabBehavior.prototype.setupListeners=function(){var _this=this;return this.rootElement.on("click","li",function(e){return e.preventDefault(),_this.removeActiveClass(),_this.hideTabbedContent(),_this.setActiveLink(e.currentTarget),_this.makeActive($(e.currentTarget))})},TabBehavior.prototype.setActiveLink=function(link){var selected_tab;return selected_tab=$(link).find("a").data().contentClass,$(selected_tab).fadeIn()},TabBehavior.prototype.makeActive=function($item){return $item.addClass("active")},TabBehavior.prototype.removeActiveClass=function(){return this.rootElement.find("li").removeClass("active")},TabBehavior.prototype.hideTabbedContent=function(){return this.rootElement.find(".tab-content").hide()},TabBehavior}(),HeaderTabNav=function(_super){function HeaderTabNav(){this.hideTabbedContent(),HeaderTabNav.__super__.constructor.apply(this,arguments)}return __extends(HeaderTabNav,_super),HeaderTabNav.prototype.rootElement=$(".header-nav"),HeaderTabNav.prototype.setupListeners=function(){var _this=this;return this.rootElement.on("click","ul.tabs li",function(e){var isActive;return e.preventDefault(),isActive=$(e.currentTarget).hasClass("active"),_this.removeActiveClass(),_this.hideTabbedContent(),isActive?void 0:(_this.setActiveLink(e.currentTarget),_this.makeActive($(e.currentTarget)))})},HeaderTabNav}(TabBehavior),ProgramsPageView=function(_super){function ProgramsPageView(){this.setfirstCurrentElement(),ProgramsPageView.__super__.constructor.apply(this,arguments)}return __extends(ProgramsPageView,_super),ProgramsPageView.prototype.rootElement=$(".tabbed-content"),ProgramsPageView.prototype.setfirstCurrentElement=function(){var currentTab;return this.hideTabbedContent(),currentTab=$(".tabbed-content li").first(),this.makeActive(currentTab),this.setActiveLink(currentTab)},ProgramsPageView}(TabBehavior),$(function(){return new HeaderTabNav})}.call(this);