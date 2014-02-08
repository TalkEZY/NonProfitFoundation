(function(){var sfControllers;sfControllers=angular.module("sfControllers",[]),sfControllers.config(["$sceProvider",function($sceProvider){return $sceProvider.enabled(!1)}]),sfControllers.controller("globalVideoModalCtrl",["$scope",function($scope){return $scope.modalShown=!1,$scope.modalVideo="",$scope.youtubeUrl="http://www.youtube.com/watch?v=WrO9PTpuSSs",$scope.codeExample1="<img ng-src='{{ youtubeUrl | youtubeImage }}'>",$scope.codeExample2="<iframe frameborder='0' ng-src='{{ youtubeUrl | youtubeIframe }}'></iframe>",$scope.$on("modal:show",function(event,url){return $scope.toggleModal(url)}),$scope.toggleModal=function(videoUrl){return $scope.modalShown=!$scope.modalShown,$scope.modalShown===!0?$scope.modalVideo=videoUrl:void 0}}]),sfControllers.controller("HomeIndexBottomTabsCtrl",["$scope","MapMarker","FeaturedArticle",function($scope,MapMarker,FeaturedArticle){return FeaturedArticle.getIndex().then(function(data){return $scope.featuredArticles=data}),MapMarker.getIndex().then(function(data){return $scope.markers=data}),$scope.currentBottomSlideTab=1,$scope.currentTabModel={},$scope.changeCurrentTab=function(tabIndex){return 0===tabIndex?$scope.currentBottomSlideTab=1:($scope.currentBottomSlideTab=2,$scope.currentTabModel=$scope.featuredArticles[tabIndex-1])},$scope.modalShown=!1,$scope.toggleModal=function(){return $scope.modalShown=!$scope.modalShown}}]),sfControllers.controller("BlogIndexCtrl",["$scope","Articles","Pagination",function($scope,Articles,Pagination){return $scope.articles=[],$scope.articleFilters={featured:"false",blog_item_category:"",year:""},$scope.articleCategories=[{name:"All",tag:""},{name:"News",tag:"News"},{name:"Events",tag:"Events"},{name:"Hear Now",tag:"Hear Now"},{name:"Gala",tag:"Gala"},{name:"Films",tag:"Films"},{name:"Celebrity",tag:"Celebrity"},{name:"Operation Change",tag:"Operation Change"},{name:"Hearing Missions",tag:"Hearing Missions"},{name:"Listen Carefully",tag:"Listen Carefully"}],$scope.articleYears=[{name:"Latest",tag:""},{name:"2014",tag:"2014"},{name:"2013",tag:"2013"},{name:"2012",tag:"2012"},{name:"2011",tag:"2011"},{name:"2010",tag:"2010"}],Articles.getIndex().then(function(data){return $scope.articles=data instanceof Array?data:[data],$scope.pagination=Pagination.getNew(9),$scope.pagination.numPages=Math.ceil($scope.articles.length/$scope.pagination.perPage)}),$scope.numberOfPages=function(){return Math.ceil($scope.articles.length/$scope.pageSize)},$scope.parseDate=function(date){var parsedDate;return parsedDate=Date.parse(date)}}]),sfControllers.controller("BlogShowCtrl",["$scope","$routeParams","$location","Articles","Article","Pagination",function($scope,$routeParams,$location,Articles,Article,Pagination){return $scope.article={prev_item:"",next_item:""},$scope.currentPosition=$routeParams.articleId,$scope.articles=[],Article.get({articleId:$routeParams.articleId},function(article){return $scope.article=article instanceof Array?article[0]:article}),Articles.getIndex().then(function(data){return $scope.articles=data instanceof Array?data:[data],$scope.pagination=Pagination.getNew(9),$scope.pagination.numPages=Math.ceil($scope.articles.length/$scope.pagination.perPage)}),$scope.numberOfPages=function(){return Math.ceil($scope.articles.length/$scope.pageSize)},$scope.parseDate=function(date){var parsedDate;return parsedDate=Date.parse(date)}}]),sfControllers.controller("MediaMentionsIndexCtrl",["$scope","MediaMentionOrPressItem","Pagination",function($scope,MediaMentionOrPressItem,Pagination){return $scope.articleFilters={featured:"false",year:"",type:""},$scope.articleCategories=[{name:"All",tag:""},{name:"Press Release",tag:"press_release"},{name:"Media Mention",tag:"media_mention"}],$scope.articleYears=[{name:"Latest",tag:""},{name:"2014",tag:"2014"},{name:"2013",tag:"2013"},{name:"2012",tag:"2012"},{name:"2011",tag:"2011"},{name:"2010",tag:"2010"}],$scope.pressItems=[],MediaMentionOrPressItem.getIndex().then(function(data){return $scope.pressItems=data,$scope.pagination=Pagination.getNew(9),$scope.pagination.numPages=Math.ceil($scope.pressItems.length/$scope.pagination.perPage)}),$scope.numberOfPages=function(){return Math.ceil($scope.pressItems.length/$scope.pageSize)},$scope.parseDate=function(date){var parsedDate;return parsedDate=Date.parse(date)}}]),sfControllers.controller("MediaMentionsShowCtrl",["$scope","$routeParams","MediaMention","MediaMentionOrPressItem","Pagination",function($scope,$routeParams,MediaMention,MediaMentionOrPressItem,Pagination){return $scope.article={prev_item:"",next_item:""},$scope.currentPosition=$routeParams.articleId,$scope.pressItems=[],MediaMention.get({mediaMentionId:$routeParams.mediaMentionId},function(pressItem){return $scope.article=pressItem instanceof Array?pressItem[0]:pressItem}),MediaMentionOrPressItem.getIndex().then(function(data){return $scope.pressItems=data,$scope.pagination=Pagination.getNew(9),$scope.pagination.numPages=Math.ceil($scope.pressItems.length/$scope.pagination.perPage)}),$scope.numberOfPages=function(){return Math.ceil($scope.pressItems.length/$scope.pageSize)},$scope.parseDate=function(date){var parsedDate;return parsedDate=Date.parse(date)}}]),sfControllers.controller("PressReleasesShowCtrl",["$scope","$routeParams","PressRelease","MediaMentionOrPressItem","Pagination",function($scope,$routeParams,PressRelease,MediaMentionOrPressItem,Pagination){return $scope.article={prev_item:"",next_item:""},$scope.currentPosition=$routeParams.pressReleaseId,$scope.pressItems=[],PressRelease.get({pressReleaseId:$routeParams.pressReleaseId},function(pressItem){return $scope.article=pressItem instanceof Array?pressItem[0]:pressItem}),MediaMentionOrPressItem.getIndex().then(function(data){return $scope.pressItems=data,$scope.pagination=Pagination.getNew(9),$scope.pagination.numPages=Math.ceil($scope.pressItems.length/$scope.pagination.perPage)}),$scope.numberOfPages=function(){return Math.ceil($scope.pressItems.length/$scope.pageSize)},$scope.parseDate=function(date){var parsedDate;return parsedDate=Date.parse(date)}}]),sfControllers.controller("ProgramsCtrl",["$scope","$routeParams","Articles","ProgramPartnership","ProgramResource",function($scope,$routeParams,Articles,ProgramPartnership,ProgramResource){return $scope.currentTab=$routeParams,$scope.programPartnerships=[],$scope.programResources=[],ProgramPartnership.getIndex().then(function(data){return $scope.programPartnerships=data instanceof Array?data:[data]}),ProgramResource.getIndex().then(function(data){return $scope.programResources=data instanceof Array?data:[data]})}])}).call(this),function(){var sfDirectives;sfDirectives=angular.module("sfDirectives",["ngSanitize","sfFilters"]),sfDirectives.factory("Pagination",function(){var pagination;return pagination={},pagination.getNew=function(perPage){var paginator;return perPage=void 0===perPage?5:perPage,paginator={numPages:1,perPage:perPage,page:0},paginator.prevPage=function(){return paginator.page>0?paginator.page-=1:void 0},paginator.nextPage=function(){return paginator.page<paginator.numPages-1?paginator.page+=1:void 0},paginator.toPageId=function(id){return id>=0&&id<=paginator.numPages-1?paginator.page=id:void 0},paginator},pagination}),sfDirectives.directive("worldMap",[function(){var controller,link;return link=function(scope){return setTimeout(function(){var mapObject;return $("#world-map-gdp").vectorMap({map:"world_mill_en",markers:scope.markers.coords,markersSelectableOne:!0,zoomOnScroll:!1,series:{markers:[{attribute:"fill",scale:["#C8EEFF","#0071A4"]}]},onMarkerClick:function(event,index){var $popup,content;return content=scope.markers.meta_data[index],$popup=$("#map-popup"),$popup.fadeOut("slow",function(){return $popup.find(".content").empty().html("<span class='close'><a href ng-click='closePopup()'>X</a></span><img src='"+content.thumbnail_url+"'/><div class='background-popup'><h1>"+content.title+"</h1><p>"+content.text+"</p></div>"),$popup.fadeIn()})}}),mapObject=$("#world-map-gdp").vectorMap("get","mapObject")},1800)},controller=function($scope){return $scope.closePopup=function(){return $("#map-popup").fadeOut()}},{restrict:"E",link:link,controller:controller,template:"<section class='map'><div id='map-popup'><div class='content'></div></div><div ng-transclude></div><div id='world-map-gdp'></div></section>",transclude:!0,replace:!0,scope:{markers:"="}}}]),sfDirectives.directive("panelTab",[function(){var template;return template="<section>\n  <div class='panel-image'>\n    <a href='{{featured.video_link_url}}' target='_blank' ng-style=\"{'background-image': 'url(' + featured.panel_image_url + ')'}\">\n    </a>\n  </div>\n  <div class='panel-content'>\n    <div>\n      <h1>{{featured.panel_title}}</h1>\n      <div ng-bind-html=\"featured.body\"></div>\n      <p class='call-to-action' ng-hide=\"featured.panel_call_to_action_link_url==''\">\n        <a href='{{featured.panel_call_to_action_link_url}}'>\n          {{featured.panel_call_to_action_text}} &rarr;\n        </a>\n      </p>\n    </div>\n  </div>\n<section>",{restrict:"E",template:template,replace:!0,scope:{featured:"="}}}]),sfDirectives.directive("homeThumblistNav",[function(){var link,template;return template='<div class=\'thumblist-nav horizontal-only\'>\n  <div>\n     <a href ng-click="clickaction(0)">\n      <div class="image" ng-style="{\'background-image\': \'url(/uploads/home/feature/building_a_better_kibera.jpg)\'}"></div>\n      <div class="content">\n        <h4>Global Hearing Mission</h4>\n        <button>Read Stories &rarr;</button>\n      </div>\n    </a>\n  </div>\n  <div ng-repeat="article in articles">\n    <a href ng-click="clickaction($index+1)">\n      <div class="image" ng-style="{\'background-image\': \'url(\' + article.thumbnail_image_url + \')\'}"></div>\n      <div class="content">\n        <h4 ng-bind="article.thumbnail_title"></h4>\n        <button ng-click="clickaction($index+1)" >{{article.thumbnail_call_to_action_text}} <span ng-hide="article.thumbnail_call_to_action_text==\'\'">&rarr;</span>&nbsp;</button>\n      </div>\n    </a>\n  </div>\n</div>',link=function(scope){var config;return config={showArrows:!1},setTimeout(function(){return scope.pane=$(".thumblist-nav"),scope.pane.jScrollPane(config)},1400)},{restrict:"E",link:link,template:template,repalce:!0,scope:{articles:"=",clickaction:"="}}}]),sfDirectives.directive("thumblistNav",["$timeout",function($timeout){var link,template;return link=function(scope){var config;return config={showArrows:!1},$timeout(function(){return scope.pane=$(".thumblist-nav"),scope.pane.jScrollPane(config)},800),scope.isFullHeight=function(){var _ref;return(null!=(_ref=scope.full)?_ref.length:void 0)>0&&"true"===scope.full},scope.thumbClasses=function(){return scope.isFullHeight()?"full thumblist thumblist-nav horizontal-only":"thumblist thumblist-nav horizontal-only"}},template='<div ng-class="thumbClasses()" ng-transclude></div>',{restrict:"E",link:link,template:template,transclude:!0,replace:!0,scope:{full:"@"}}}]),sfDirectives.directive("swiper",["$timeout",function($timeout){var controller,link;return link=function(scope,element,attrs){var config,_ref;return config=void 0,config={},config.auto=(null!=(_ref=attrs.auto)?_ref.length:void 0)>0?attrs.auto:!1,config.speed=parseInt(attrs.speed,10)||500,attrs.disableScroll&&(config.disableScroll=!!attrs.disableScroll),attrs.continuous&&(config.continuous=!!attrs.continuous),$timeout(function(){return scope.swipe=new Swipe(document.getElementById(scope.identifier),config)},1800),scope.showPaginator=function(){return null!=scope.paginator&&"true"===scope.paginator},scope.isShort=function(){return null!=scope.tall&&"false"===scope.tall}},controller=function($scope){return $scope.next=function(){return $scope.swipe.next()},$scope.prev=function(){return $scope.swipe.prev()},$scope.slide=function(index){return $scope.swipe.slide(index)}},{restrict:"E",link:link,controller:controller,template:'<div class="swiper" ng-class="{\'short\': isShort()}">\n  <div class="swiper-controls" ng-show="showPaginator()">\n    <a href class="left" ng-click="prev()"><span class="icon starkey-pg-arrow-left"></span></a>\n    <a href class="right" ng-click="next()"><span class="icon starkey-pg-arrow-right"></span></a>\n  </div>\n  <div id=\'{{identifier}}\' class=\'swipe\'>\n    <div class=\'swipe-wrap\' ng-transclude>\n    </div>\n  </div>\n</div>',transclude:!0,replace:!0,scope:{identifier:"@",paginator:"@",tall:"@"}}}]),sfDirectives.directive("slide",[function(){var controller,link,result,slideTemplate,thumbTemplate;return link=function(scope){return null==scope.imageUrl&&(scope.imageUrl=""),null==scope.videoUrl&&(scope.videoUrl=""),null==scope.linkUrl&&(scope.linkUrl=""),null==scope.linkText&&(scope.linkText=""),null==scope.headline&&(scope.headline=""),null==scope.bodyCopy&&(scope.bodyCopy=""),null==scope.thumblist&&(scope.thumblist="false"),null==scope.date&&(scope.date=""),null==scope.blogCategory&&(scope.blogCategory=""),null==scope.quote&&(scope.quote=""),null==scope.backgroundColor&&(scope.backgroundColor=""),null==scope.logoImageUrl&&(scope.logoImageUrl=""),null==scope.linkStyle&&(scope.linkStyle=""),scope.youttubePattern=/^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11,11}).*$/,scope.youtubeId=function(){return scope.videoUrl.match(scope.youttubePattern)[1]},scope.hasVideo=function(){var _ref;return(null!=(_ref=scope.videoUrl)?_ref.length:void 0)>0},scope.hasBlogCategory=function(){var _ref;return(null!=(_ref=scope.blogCategory)?_ref.length:void 0)>0},scope.hasDate=function(){var _ref;return(null!=(_ref=scope.date)?_ref.length:void 0)>0},scope.hasLinkText=function(){var _ref;return(null!=(_ref=scope.linkText)?_ref.length:void 0)>0},scope.hasLinkStyle=function(){var _ref;return(null!=(_ref=scope.linkStyle)?_ref.length:void 0)>0},scope.hasQuote=function(){var _ref;return(null!=(_ref=scope.quote)?_ref.length:void 0)>0},scope.hasHeadline=function(){var _ref;return(null!=(_ref=scope.headline)?_ref.length:void 0)>0},scope.hasBodyCopy=function(){var _ref;return(null!=(_ref=scope.bodyCopy)?_ref.length:void 0)>0},scope.hasLogoImageUrl=function(){var _ref;return(null!=(_ref=scope.logoImageUrl)?_ref.length:void 0)>0},scope.isThumblist=function(){var _ref;return(null!=(_ref=scope.thumblist)?_ref.length:void 0)>0&&"true"===scope.thumblist},scope.getYoutubeVideoThumbnail=function(){return scope.hasVideo()?"http://img.youtube.com/vi/"+scope.youtubeId()+"/1.jpg":void 0},scope.getImage=function(){return scope.imageUrl||scope.getYoutubeVideoThumbnail()},scope.backgroundImageStyle=scope.hasQuote()?{background:scope.backgroundColor}:{"background-image":"url("+scope.getImage()+")"},scope.actionLinkStyle=function(){return scope.isThumblist()?"call-to-action "+scope.linkStyle:"action-link "+scope.linkStyle},scope.displayInModalIfVideo=function(){return scope.hasVideo()?scope.$emit("modal:show",scope.videoUrl):void 0}},controller=function(){},slideTemplate='<div class="slide">\n  <article ng-style="backgroundImageStyle"></article>\n  <blockquote ng-show="hasQuote()">{{quote}}</blockquote>\n  <div ng-show="!hasQuote()" class="gradient-background"></div>\n  <div ng-show="hasVideo()" class="play-video-link">\n    <a href ng-click="displayInModalIfVideo()"><span class="icon starkey-legend-3"></a>\n  </div>\n  <aside>\n    <h1 ng-show="hasHeadline()">{{headline}}</h1>\n    <p ng-show="hasBodyCopy()">{{bodyCopy}}</p>\n    <div class="logo" ng-show="hasLogoImageUrl()"><img ng-src="{{logoImageUrl}}"/></div>\n    <a href="{{linkUrl}}" target="_blank" ng-class="actionLinkStyle()" ng-show="!hasVideo() && hasLinkText()">{{linkText}}</a>\n    <a href class="action-link" ng-show="hasVideo()" ng-click="displayInModalIfVideo()">Watch video</a>\n  </aside>\n</div>',thumbTemplate='<div>\n  <a href=\'{{linkUrl}}\'>\n    <div class="image" ng-style="backgroundImageStyle"></div>\n    <div class="content">\n      <h4 ng-show="hasHeadline()">{{headline}}</h4>\n      <p class="blog-category" ng-show="hasBlogCategory()">{{date}}</p>\n      <p class="date" ng-show="hasDate()">{{date}}</p>\n      <p ng-class=\'actionLinkStyle()\' ng-show="hasLinkText()">\n        {{linkText}} &rarr;\n      </p>\n    </div>\n  </a>\n</div>',result={restrict:"E",controller:controller,replace:!0,template:function(elem,attr){return null!=attr.thumblist&&"true"===attr.thumblist?thumbTemplate:slideTemplate},link:link,scope:{imageUrl:"@",videoUrl:"@",linkUrl:"@",linkText:"@",headline:"@",bodyCopy:"@",thumblist:"@",date:"@",blogCategory:"@",quote:"@",backgroundColor:"@",logoImageUrl:"@",linkStyle:"@"}}}]),sfDirectives.directive("pageTile",[function(){var link,result,template;return link=function(scope){return null==scope.feedUrl&&(scope.feedUrl=""),null==scope.title&&(scope.title=""),null==scope.date&&(scope.date=""),null==scope.year&&(scope.year=""),null==scope.detailPage&&(scope.detailPage=""),null==scope.type&&(scope.type=""),null==scope.featured&&(scope.featured=""),null==scope.headerImageUrl&&(scope.headerImageUrl=""),null==scope.logoImageUrl&&(scope.logoImageUrl=""),null==scope.quote&&(scope.quote=""),null==scope.callToActionText&&(scope.callToActionText=""),null==scope.callToActionLink&&(scope.callToActionLink=""),null==scope.videoLink&&(scope.videoLink=""),scope.getCategory=function(){return"press_release"===scope.type?"Press Release":"Media Mention"},scope.parseDate=function(date){return Date.parse(date)}},template='<div class=\'block\'>\n  <div class="image" ng-style="{\'background-image\': \'url(\' + headerImageUrl + \')\'}"></div>\n  <p class="category">{{getCategory()}}</p>\n  <h2 class="headline">{{title}}</h2>\n  <p class=\'date\'>{{parseDate(date) | date:"MMMM d yyyy"}}</p>\n  <p class=\'read-more\' ng-switch="type">\n    <a ng-switch-when="press_release" href="#/press_releases/{{id}}">\n      Read more &rarr;\n    </a>\n    <a ng-switch-when="media_mention" href="{{videoLink}}" target="_blank">\n      Read more &rarr;\n    </a>\n  </p>\n</div>',result={restrict:"E",replace:!0,template:template,link:link,scope:{id:"@",feedUrl:"@",title:"@",date:"@",year:"@",detailPage:"@",type:"@",featured:"@",headerImageUrl:"@",logoImageUrl:"@",quote:"@",callToActionText:"@",callToActionLink:"@",videoLink:"@"}}}]),sfDirectives.directive("videoPlayerModal",[function(){return{restrict:"E",scope:{show:"="},replace:!0,transclude:!0,link:function(scope,element,attrs){return scope.dialogStyle={},attrs.width&&(scope.dialogStyle.width=attrs.width),attrs.height&&(scope.dialogStyle.height=attrs.height),scope.hideModal=function(){return scope.show=!1},scope.$watch("show",function(newVal,oldVal){return newVal&&!oldVal?(angular.element(element.find("div")[3]).html("<iframe frameborder='0' ng-src='show | youtubeIframe'></iframe>"),document.getElementsByTagName("body")[0].style.overflow="hidden"):document.getElementsByTagName("body")[0].style.overflow=""})},template:"<div class='ng-modal' ng-show='show'>\n  <div class='ng-modal-overlay' ng-click='hideModal()'></div>\n  <div class='ng-modal-dialog' ng-style='dialogStyle'>\n    <div class='ng-modal-close' ng-click='hideModal()'>X</div>\n    <div class='ng-modal-dialog-content'>\n\n    </div>\n  </div>\n</div>"}}])}.call(this),function(){var sfFilters;sfFilters=angular.module("sfFilters",["sfServices"]),sfFilters.filter("startFrom",function(){return function(input,start){return input.slice(+start)}}),sfFilters.filter("range",function(){return function(input,total){var i;for(total=parseInt(total),i=0;total>i;)input.push(i),i++;return input}}),sfFilters.filter("youtubeIframe",["$filter","Youtube",function($filter,Youtube){return function(value){var videoid;return value?(videoid=value.match(Youtube.regex()),null===videoid?"":"//www.youtube.com/embed/"+videoid[1]):value}}]),sfFilters.filter("youtubeImage",["$filter","Youtube",function($filter,Youtube){return function(value,quality){var videoid;return quality=quality||"default",value?(videoid=value.match(Youtube.regex()),null===videoid?"":"https://img.youtube.com/vi/"+videoid[1]+"/"+quality+".jpg"):value}}])}.call(this),function(){var HomePageApp,blogPagesApp,mediaMentionsPagesApp,programsPageApp;blogPagesApp=angular.module("blogPagesApp",["ngRoute","ngAnimate","ngSanitize","sfControllers","sfDirectives","sfFilters","sfServices"]),blogPagesApp.config(["$routeProvider",function($routeProvider){return $routeProvider.when("/articles",{templateUrl:"partials/articles/index.html",controller:"BlogIndexCtrl"}).when("/articles/:articleId",{templateUrl:"partials/articles/show.html",controller:"BlogShowCtrl"}).otherwise({redirectTo:"/articles"})}]),mediaMentionsPagesApp=angular.module("mediaMentionsPagesApp",["ngRoute","ngAnimate","ngSanitize","sfControllers","sfDirectives","sfFilters","sfServices"]),mediaMentionsPagesApp.config(["$routeProvider",function($routeProvider){return $routeProvider.when("/media_mentions",{templateUrl:"partials/media_mentions/index.html",controller:"MediaMentionsIndexCtrl"}).when("/press_releases/:pressReleaseId",{templateUrl:"partials/press_releases/show.html",controller:"PressReleasesShowCtrl"}).when("/media_mentions/:mediaMentionId",{templateUrl:"partials/media_mentions/show.html",controller:"MediaMentionsShowCtrl"}).otherwise({redirectTo:"/media_mentions"})}]),programsPageApp=angular.module("programsPageApp",["ngRoute","ngAnimate","sfControllers","sfDirectives","sfFilters","sfServices"]),programsPageApp.config(["$routeProvider",function($routeProvider){return $routeProvider.when("/programs/:tabId",{templateUrl:function(params){return"api/program_"+params.tabId},controller:"ProgramsCtrl"}).otherwise({redirectTo:"/programs/0"})}]),HomePageApp=angular.module("homePageApp",["ngRoute","ngAnimate","ngSanitize","sfControllers","sfDirectives","sfFilters","sfServices"])}.call(this),function(){"use strict";var sfServices;sfServices=angular.module("sfServices",["ngResource"]),sfServices.factory("urlChooser",[function(){var env,getIndexFormat,getUrl,urlChooserInstance;return env="production",urlChooserInstance={},getUrl=function(){switch(env){case"development":return"/local/api";case"staging":return"http://starkey.local/api";default:return"/api"}},getIndexFormat=function(){return"development"===env?"/index.json":""},{getUrl:getUrl(),getIndexFormat:getIndexFormat()}}]),sfServices.factory("Article",["$resource","urlChooser",function($resource,urlChooser){return $resource(""+urlChooser.getUrl+"/blog/:articleId",{},{})}]),sfServices.factory("Articles",["$q","$http","$resource","urlChooser",function($q,$http,$resource,urlChooser){var getIndex;return getIndex=function(){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/blog"+urlChooser.getIndexFormat).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getIndex:getIndex}}]),sfServices.factory("FeaturedArticle",["$q","$http","$resource","urlChooser",function($q,$http,$resource,urlChooser){var getIndex;return getIndex=function(){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/featured_articles"+urlChooser.getIndexFormat).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getIndex:getIndex}}]),sfServices.factory("MapMarker",["$q","$http","$resource","urlChooser",function($q,$http,$resource,urlChooser){var getIndex;return getIndex=function(){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/homepage_markers"+urlChooser.getIndexFormat).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getIndex:getIndex}}]),sfServices.factory("MediaMentionOrPressItem",["$q","$http","$resource","urlChooser",function($q,$http,$resource,urlChooser){var getIndex;return getIndex=function(){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/press"+urlChooser.getIndexFormat).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getIndex:getIndex}}]),sfServices.factory("PressRelease",["$resource","urlChooser",function($resource,urlChooser){return $resource(""+urlChooser.getUrl+"/press_releases/:pressReleaseId.json",{},{})}]),sfServices.factory("MediaMention",["$resource","urlChooser",function($resource,urlChooser){return $resource(""+urlChooser.getUrl+"/media_mentions/:mediaMentionId.json",{},{})}]),sfServices.factory("ProgramContent",["$q","$http","urlChooser",function($q,$http,urlChooser){var getResource;return getResource=function(programContentId){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/program_"+programContentId).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getResource:getResource}}]),sfServices.factory("ProgramPartnership",["$q","$http","urlChooser",function($q,$http,urlChooser){var getIndex;return getIndex=function(){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/program_partnerships"+urlChooser.getIndexFormat).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getIndex:getIndex}}]),sfServices.factory("ProgramResource",["$q","$http","urlChooser",function($q,$http,urlChooser){var getIndex;return getIndex=function(){var deferred;return deferred=$q.defer(),$http.get(""+urlChooser.getUrl+"/program_resources"+urlChooser.getIndexFormat).success(function(data){return deferred.resolve(data)}).error(function(reason){return deferred.reject(reason)}),deferred.promise},{getIndex:getIndex}}]),sfServices.service("Youtube",[function(){var regex;return regex=/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/,{regex:function(){return regex}}}])}.call(this),function(){var HeaderTabNav,ProgramsPageView,TabBehavior,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};TabBehavior=function(){function TabBehavior(){this.setActiveLink=__bind(this.setActiveLink,this),this.setupListeners()}return TabBehavior.prototype.rootElement=$(document),TabBehavior.prototype.setupListeners=function(){var _this=this;return this.rootElement.on("click","li",function(e){return e.preventDefault(),_this.removeActiveClass(),_this.hideTabbedContent(),_this.setActiveLink(e.currentTarget),_this.makeActive($(e.currentTarget))})},TabBehavior.prototype.setActiveLink=function(link){var selected_tab;return selected_tab=$(link).find("a").data().contentClass,$(selected_tab).fadeIn()},TabBehavior.prototype.makeActive=function($item){return $item.addClass("active")},TabBehavior.prototype.removeActiveClass=function(){return this.rootElement.find("li").removeClass("active")},TabBehavior.prototype.hideTabbedContent=function(){return this.rootElement.find(".tab-content").hide()},TabBehavior}(),HeaderTabNav=function(_super){function HeaderTabNav(){this.hideTabbedContent(),HeaderTabNav.__super__.constructor.apply(this,arguments)}return __extends(HeaderTabNav,_super),HeaderTabNav.prototype.rootElement=$(".header-nav"),HeaderTabNav.prototype.setupListeners=function(){var _this=this;return this.rootElement.on("click","ul.tabs li",function(e){var isActive;return e.preventDefault(),isActive=$(e.currentTarget).hasClass("active"),_this.removeActiveClass(),_this.hideTabbedContent(),isActive?void 0:(_this.setActiveLink(e.currentTarget),_this.makeActive($(e.currentTarget)))})},HeaderTabNav}(TabBehavior),ProgramsPageView=function(){function ProgramsPageView(){this.setupListeners()}return ProgramsPageView.prototype.setupListeners=function(){return $(document).on("click",".become-a-provider",function(e){return e.preventDefault(),$(".programs-page .become-a-provider-container").toggleClass("hidden")})},ProgramsPageView}(),$(function(){return new HeaderTabNav,$(".programs-page").length?new ProgramsPageView:void 0})}.call(this);