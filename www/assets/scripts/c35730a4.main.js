(function() {
    var sfControllers;
    sfControllers = angular.module("sfControllers", []), sfControllers.config([ "$sceProvider", function($sceProvider) {
        return $sceProvider.enabled(!1);
    } ]), sfControllers.controller("globalCtrl", [ "$scope", "$rootScope", "$location", "$timeout", function($scope, $rootScope, $location, $timeout) {
        var displayModal, videoUrl;
        return $scope.showModal = !1, $scope.videoIframe = "", $scope.showSubscribeForm = !1, 
        $rootScope.location = $location, "/articles" === $location.url() && ($scope.blogOverview = !0), 
        $scope.loadingRoute = !1, $scope.$on("$routeChangeStart", function() {
            return $scope.loadingRoute = !0;
        }), $scope.$on("$routeChangeSuccess", function() {
            return $scope.loadingRoute = !1, $scope.blogOverview = "/articles" === $location.url() ? !0 : !1;
        }), videoUrl = $location.search().video, $scope.$on("modal:hide", function() {
            return $scope.showModal = !1;
        }), $scope.$on("modal:show", function(event, url) {
            return $scope.showModal = !$scope.showModal, $scope.showModal === !0 ? displayModal(url) : void 0;
        }), $timeout(function() {
            return null != videoUrl ? ($scope.showModal = !0, displayModal("http://www.youtube.com/watch?v=" + videoUrl)) : void 0;
        }, 1e3), displayModal = function(url) {
            return $scope.videoIframe = url;
        }, $scope.toggleSubscribeForm = function() {
            return $scope.showSubscribeForm = !$scope.showSubscribeForm;
        }, $scope.openSubscribeForm = function() {
            return $scope.showSubscribeForm = !0;
        };
    } ]), sfControllers.controller("HomeIndexBottomTabsCtrl", [ "$scope", "MapMarker", "FeaturedArticle", function($scope, MapMarker, FeaturedArticle) {
        return FeaturedArticle.getIndex().then(function(data) {
            return $scope.featuredArticlesHash = data;
        }), MapMarker.getIndex().then(function(data) {
            return $scope.markers = data;
        }), $scope.currentBottomSlideTab = 1, $scope.currentTabModel = {}, $scope.changeCurrentTab = function(tabIndex) {
            return 0 === tabIndex ? $scope.currentBottomSlideTab = 1 : ($scope.currentBottomSlideTab = 2, 
            $scope.currentTabModel = $scope.featuredArticlesHash.articles[tabIndex - 1]);
        }, $scope.modalShown = !1, $scope.toggleModal = function() {
            return $scope.modalShown = !$scope.modalShown;
        };
    } ]), sfControllers.controller("BlogIndexCtrl", [ "$scope", "$window", "Articles", "Pagination", "api_data", "$filter", function($scope, $window, Articles, Pagination, api_data, $filter) {
        var currentPageCollection, isMobile, itemsPerPage;
        return itemsPerPage = 9, $scope.articleFilters = {
            featured: "false",
            blog_item_category: "",
            year: ""
        }, $scope.windowWidth = $window.innerWidth, $scope.articles = api_data.articles, 
        $scope.articleCategories = api_data.cats, $scope.articleYears = api_data.years, 
        $scope.pagination = Pagination.getNew(itemsPerPage), $scope.nonFeaturedArticles = $filter("filter")($scope.articles, $scope.articleFilters), 
        $scope.articlesForMobile = $scope.nonFeaturedArticles.slice(0, +(itemsPerPage - 1) + 1 || 9e9), 
        $scope.pagination.numPages = Math.ceil($scope.nonFeaturedArticles.length / $scope.pagination.perPage), 
        $scope.$watch("articleFilters.blog_item_category", function() {
            $scope.nonFeaturedArticles = $filter("filter")($scope.articles, $scope.articleFilters), 
            $scope.pagination.numPages = Math.ceil($scope.nonFeaturedArticles.length / $scope.pagination.perPage);
        }), $scope.$watch("articleFilters.year", function() {
            $scope.nonFeaturedArticles = $filter("filter")($scope.articles, $scope.articleFilters), 
            $scope.pagination.numPages = Math.ceil($scope.nonFeaturedArticles.length / $scope.pagination.perPage);
        }), $scope.numberOfPages = function() {
            return Math.ceil($scope.nonFeaturedArticles.length / $scope.pageSize);
        }, $scope.parseDate = function(date) {
            return Date.parse(date);
        }, $scope.loadMore = function() {
            return $scope.pagination.nextPage(), $scope.articlesForMobile = $scope.articlesForMobile.concat($scope.nonFeaturedArticles.slice(currentPageCollection(), +(currentPageCollection() + $scope.pagination.perPage) + 1 || 9e9));
        }, isMobile = function() {
            return $scope.windowWidth < 768;
        }, $scope.pageStart = function() {
            return null != $scope.pagination ? isMobile() ? 0 : currentPageCollection() : void 0;
        }, $scope.pageEnd = function() {
            return null != $scope.pagination ? isMobile() ? ($scope.pagination.page + 1) * $scope.pagination.perPage : $scope.pagination.perPage : void 0;
        }, currentPageCollection = function() {
            return $scope.pagination.page * $scope.pagination.perPage;
        }, $scope.isAtPaginationEnd = function() {
            return $scope.articlesForMobile.length >= $scope.nonFeaturedArticles.length;
        };
    } ]), sfControllers.controller("BlogShowCtrl", [ "$scope", "$routeParams", "$location", "$sce", "Articles", "Article", "Pagination", function($scope, $routeParams, $location, $sce, Articles, Article, Pagination) {
        return $scope.currentPosition = $routeParams.articleId, $scope.articles = [], Articles.getIndex().then(function(data) {
            return $scope.articles = data instanceof Array ? data : [ data ], $scope.pagination = Pagination.getNew(9), 
            $scope.pagination.numPages = Math.ceil($scope.articles.length / $scope.pagination.perPage);
        }), $scope.numberOfPages = function() {
            return Math.ceil($scope.articles.length / $scope.pageSize);
        };
    } ]), sfControllers.controller("GalaCtrl", [ "$scope", "$routeParams", "GalaItems", "GalaTabs", function($scope, $routeParams, GalaItems, GalaTabs) {
        return GalaItems.getIndex().then(function(data) {
            return $scope.timelineItems = data;
        }), GalaTabs.getIndex().then(function(data) {
            return $scope.galaTabs = data;
        });
    } ]), sfControllers.controller("LegalPagesCtrl", [ "$scope", "$routeParams", function($scope) {
        return $scope.currentTab = 0;
    } ]), sfControllers.controller("MediaMentionsIndexCtrl", [ "$scope", "MediaMentionOrPressItem", "Pagination", function($scope, MediaMentionOrPressItem, Pagination) {
        return $scope.articleFilters = {
            featured: "",
            year: "",
            type: ""
        }, $scope.articleCategories = [ {
            name: "All Articles",
            value: ""
        }, {
            name: "Press Release",
            value: "press_release"
        }, {
            name: "Media Mention",
            value: "media_mention"
        } ], $scope.articleYears = [ {
            name: "Latest",
            value: ""
        }, {
            name: "2014",
            value: "2014"
        }, {
            name: "2013",
            value: "2013"
        }, {
            name: "2012",
            value: "2012"
        }, {
            name: "2011",
            value: "2011"
        }, {
            name: "2010",
            value: "2010"
        } ], $scope.pressItems = [], MediaMentionOrPressItem.getIndex().then(function(data) {
            return $scope.pressItems = data, $scope.pagination = Pagination.getNew(9), $scope.pagination.numPages = Math.ceil($scope.pressItems.length / $scope.pagination.perPage);
        }), $scope.numberOfPages = function() {
            return Math.ceil($scope.pressItems.length / $scope.pageSize);
        }, $scope.parseDate = function(date) {
            var parsedDate;
            return parsedDate = Date.parse(date);
        }, $scope.setTypeFilter = function(filterObj) {
            return $scope.articleFilters.type = filterObj.value;
        };
    } ]), sfControllers.controller("MediaMentionsShowCtrl", [ "$scope", "$routeParams", "MediaMention", "MediaMentionOrPressItem", "Pagination", function($scope, $routeParams, MediaMention, MediaMentionOrPressItem, Pagination) {
        return $scope.article = {
            prev_item: "",
            next_item: ""
        }, $scope.currentPosition = $routeParams.articleId, $scope.pressItems = [], MediaMention.get({
            mediaMentionId: $routeParams.mediaMentionId
        }, function(pressItem) {
            return $scope.article = pressItem instanceof Array ? pressItem[0] : pressItem;
        }), MediaMentionOrPressItem.getIndex().then(function(data) {
            return $scope.pressItems = data, $scope.pagination = Pagination.getNew(9), $scope.pagination.numPages = Math.ceil($scope.pressItems.length / $scope.pagination.perPage);
        }), $scope.numberOfPages = function() {
            return Math.ceil($scope.pressItems.length / $scope.pageSize);
        }, $scope.parseDate = function(date) {
            var parsedDate;
            return parsedDate = Date.parse(date);
        };
    } ]), sfControllers.controller("MissionsPageCtrl", [ "$scope", "MissionsMapMarker", "MissionsPage", function($scope, MissionsMapMarker, MissionsPage) {
        return $scope.currentTab = 0, MissionsMapMarker.getIndex().then(function(data) {
            return $scope.data = data;
        }), MissionsPage.getPage().then(function(data) {
            return $scope.missions = data, $scope.statistics = $scope.missions.hearing_mission_statistics, 
            $scope.content_tabs = $scope.missions.content_tabs, $scope.highlights = $scope.missions.highlights;
        }), $scope.changeTab = function(tabId) {
            return $scope.currentTab = tabId;
        };
    } ]), sfControllers.controller("MissionsIndexCtrl", [ "$scope", "Pagination", "MissionsIndex", function($scope, Pagination, MissionsIndex) {
        return $scope.highlightRegions = [], $scope.currentRegion = {}, $scope.missionsHighlights = [], 
        $scope.currentCountry = "", $scope.highlightsFilters = {
            year: "",
            region: "",
            country: ""
        }, $scope.highlightYears = [ {
            name: "Latest",
            value: ""
        } ], MissionsIndex.getIndex().then(function(data) {
            var addedYear, year, _i, _len, _ref, _results;
            for ($scope.missionsHighlights = data.highlights, $scope.pagination = Pagination.getNew(9), 
            $scope.pagination.numPages = Math.ceil($scope.missionsHighlights.length / $scope.pagination.perPage), 
            $scope.highlightRegions = data.categories, _ref = data.years, _results = [], _i = 0, 
            _len = _ref.length; _len > _i; _i++) year = _ref[_i], addedYear = {
                name: year,
                value: year
            }, _results.push($scope.highlightYears.push(addedYear));
            return _results;
        }), $scope.hideCountryDropdown = function() {
            return "" === $scope.highlightsFilters.region;
        }, $scope.$watch("currentRegion", function(newVal) {
            var _ref;
            return (null != newVal ? null != (_ref = newVal.region) ? _ref.length : void 0 : void 0) > 0 ? ($scope.highlightsFilters.region = newVal.region, 
            $scope.highlightsFilters.country = "") : $scope.highlightsFilters.region = "";
        }), $scope.numberOfPages = function() {
            return Math.ceil($scope.missionsHighlights.length / $scope.pageSize);
        };
    } ]), sfControllers.controller("MissionsShowCtrl", [ "$scope", "$routeParams", "$location", "Articles", "HearingMissionArticle", "Pagination", function() {} ]), 
    sfControllers.controller("PressReleasesShowCtrl", [ "$scope", "$routeParams", "PressRelease", "MediaMentionOrPressItem", "Pagination", function($scope, $routeParams, PressRelease, MediaMentionOrPressItem, Pagination) {
        return $scope.article = {
            prev_item: "",
            next_item: ""
        }, $scope.currentPosition = $routeParams.pressReleaseId, $scope.pressItems = [], 
        PressRelease.get({
            pressReleaseId: $routeParams.pressReleaseId
        }, function(pressItem) {
            return $scope.article = pressItem instanceof Array ? pressItem[0] : pressItem;
        }), MediaMentionOrPressItem.getIndex().then(function(data) {
            return $scope.pressItems = data, $scope.pagination = Pagination.getNew(9), $scope.pagination.numPages = Math.ceil($scope.pressItems.length / $scope.pagination.perPage);
        }), $scope.numberOfPages = function() {
            return Math.ceil($scope.pressItems.length / $scope.pageSize);
        }, $scope.parseDate = function(date) {
            var parsedDate;
            return parsedDate = Date.parse(date);
        };
    } ]), sfControllers.controller("ProgramsCtrl", [ "$scope", "$routeParams", "Articles", "ProgramPartnership", "ProgramResource", function($scope, $routeParams) {
        return $scope.currentTab = $routeParams;
    } ]), sfControllers.controller("TakeActionCtrl", [ "$scope", "$routeParams", function($scope, $routeParams) {
        return $scope.currentTab = $routeParams, $scope.showForm = !1, $scope.toggleForm = function() {
            return $scope.showForm = !$scope.showForm;
        };
    } ]), sfControllers.controller("PreviewShowCtrl", [ "$scope", "$routeParams", "$sce", "Preview", function($scope, $routeParams, $sce, Preview) {
        return Preview.getDetail($routeParams.articleId).then(function(data) {
            return $scope.article = data;
        });
    } ]);
}).call(this), function() {
    var sfDirectives;
    sfDirectives = angular.module("sfDirectives", [ "ngSanitize", "sfFilters" ]), sfDirectives.directive("accordion", [ function() {
        var template;
        return template = '<div class="accordion" ng-transclude></div>', {
            restrict: "EA",
            replace: !0,
            transclude: !0,
            template: template,
            controller: function() {
                var expanders;
                expanders = [], this.gotOpened = function(selectedExpander) {
                    angular.forEach(expanders, function(expander) {
                        selectedExpander !== expander && (expander.showMe = !1);
                    });
                }, this.addExpander = function(expander) {
                    expanders.push(expander);
                };
            }
        };
    } ]), sfDirectives.directive("accordionList", [ function() {
        var link, template;
        return link = function() {}, template = '<div class="accordion-list">\n  <h3>{{title}}</h3>\n  <ul ng-transclude></ul>\n</div>', 
        {
            restrict: "E",
            replace: !0,
            transclude: !0,
            template: template,
            link: link,
            scope: {
                title: "@"
            }
        };
    } ]), sfDirectives.directive("accordionListItem", [ function() {
        var link, template;
        return link = function() {}, template = '<li class="accordion-list-item">\n  <h3>{{title}}</h3>\n  <h3>{{subhead}}</h3>\n  <div ng-transclude></div>\n</li>', 
        {
            restrict: "E",
            replace: !0,
            transclude: !0,
            template: template,
            link: link,
            scope: {
                title: "@",
                subhead: "@"
            }
        };
    } ]), sfDirectives.directive("detailPage", [ "$timeout", "$compile", function() {
        var link, result;
        return link = function(scope) {
            return null == scope.author && (scope.author = ""), null == scope.body && (scope.body = ""), 
            null == scope.category && (scope.category = ""), null == scope.date && (scope.date = ""), 
            null == scope.detailPageType && (scope.detailPageType = ""), null == scope.hasRelatedPosts && (scope.hasRelatedPosts = ""), 
            null == scope.headerImageUrl && (scope.headerImageUrl = ""), null == scope.previousPageId && (scope.previousPageId = ""), 
            null == scope.nextPageId && (scope.nextPageId = ""), null == scope.shareThis && (scope.shareThis = ""), 
            null == scope.subhead && (scope.subhead = ""), null == scope.thumbnailImageUrl && (scope.thumbnailImageUrl = ""), 
            null != scope.title ? scope.title : scope.title = "";
        }, result = {
            restrict: "E",
            replace: !0,
            templateUrl: function() {
                return "templates/blog_detail_page.html";
            },
            link: link,
            scope: {
                author: "@",
                body: "@",
                category: "@",
                date: "@",
                detailPageType: "@",
                hasRelatedPosts: "@",
                headerImageUrl: "@",
                previousPageId: "@",
                nextPageId: "@",
                shareThis: "@",
                subhead: "@",
                thumbnailImageUrl: "@",
                title: "@"
            }
        };
    } ]), sfDirectives.directive("dropdown", [ function() {
        var controller, link, result;
        return link = function(scope) {
            return scope.isActive = !1, scope.currentOption = scope.options[0] || {};
        }, controller = function($scope) {
            var dropdownOptions;
            dropdownOptions = [], this.gotSelected = function(selectedDropdownOption) {
                angular.forEach(dropdownOptions, function(dropdownOption) {
                    selectedDropdownOption === dropdownOption ? ($scope.currentOption = selectedDropdownOption, 
                    $scope.callFilter = $scope.currentOption.value) : dropdownOption.isCurrent = !1;
                });
            }, this.addDropdownOption = function(dropdownOption) {
                dropdownOptions.push(dropdownOption);
            };
        }, result = {
            restrict: "E",
            transclude: !0,
            replace: !0,
            controller: controller,
            template: '<div class="outer-dropdown-wrapper">\n  <div class="dropdown-wrapper" ng-click="isActive=!isActive" ng-class="{active: isActive==true}">\n    <span >{{currentOption.name}}</span>\n    <ul class="dropdown-list" ng-show="isActive==true">\n      <dropdown-option ng-repeat="option in options" name="{{option.name}}" value="{{option.value}}"></dropdown-option>\n    </ul>\n  </div>\n</div>',
            link: link,
            scope: {
                options: "=",
                callFilter: "="
            }
        };
    } ]), sfDirectives.directive("dropdownOption", [ function() {
        var link, result;
        return link = function(scope, element, attrs, dropdownController) {
            scope.isSelected = !1, dropdownController.addDropdownOption(scope), scope.selectOption = function() {
                scope.isSelected = !scope.isSelected, dropdownController.gotSelected(scope);
            };
        }, result = {
            restrict: "E",
            replace: !0,
            require: "^?dropdown",
            template: '<li>\n  <a href ng-click="selectOption()">{{name}}</a>\n</li>',
            link: link,
            scope: {
                name: "@",
                value: "@"
            }
        };
    } ]), sfDirectives.directive("expander", [ function() {
        var template;
        return template = '<div>\n  <a class="title" href ng-click="toggle()" ng-class="{active: showMe==true}">{{title}} <span class="arrow">&gt;</span></a>\n  <div class="body reveal" ng-show="showMe" ng-transclude>\n  </div>\n</div>', 
        {
            restrict: "EA",
            replace: !0,
            transclude: !0,
            require: "^?accordion",
            template: template,
            link: function(scope, element, attrs, accordionController) {
                var toggle;
                scope.showMe = !1, accordionController.addExpander(scope), scope.toggle = toggle = function() {
                    scope.showMe = !scope.showMe, accordionController.gotOpened(scope);
                };
            },
            scope: {
                title: "@"
            }
        };
    } ]), sfDirectives.directive("dynamic", [ "$compile", function($compile) {
        return {
            restrict: "A",
            replace: !0,
            link: function(scope, element, attrs) {
                return scope.$watch(attrs.dynamic, function(html) {
                    return element.html(html), $compile(element.contents())(scope);
                });
            }
        };
    } ]), sfDirectives.directive("facebook", [ "$timeout", "$http", function($timeout, $http) {
        return {
            restrict: "E",
            scope: {
                url: "@",
                caption: "@"
            },
            replace: !0,
            template: '<section class="facebook-fans centered">\n  <div class="footer-list-item">\n    <h1>{{shares}} <strong>fans</strong></h1>\n  </div>\n  <p class="read-more">\n    <a href="http://www.facebook.com/sharer.php?u=http://starkeyhearingfoundation.org" target="_blank">\n      Like us\n      <span class="facebook-like-hand"></span>\n    </a>\n  </p>\n</section>',
            link: function(scope) {
                var endpoint;
                return scope.shares = 0, endpoint = "https://graph.facebook.com/fql?q=SELECT total_count FROM link_stat WHERE url='http://www.facebook.com/starkeycares'", 
                $http.get(endpoint).success(function(res) {
                    return scope.shares = res.data[0].total_count;
                }).error(function() {
                    return scope.shares = 0;
                });
            }
        };
    } ]), sfDirectives.directive("galaThumblistNav", [ "$http", "$sce", function($http) {
        var config, controller, link;
        return config = {}, link = function(scope) {
            return setTimeout(function() {
                return scope.pane = $(".thumblist-nav"), scope.pane.jScrollPane(config);
            }, 1400);
        }, controller = function($scope) {
            return $scope.getItem = function(url) {
                return $http.get("/api/gala_item/" + url).then(function(response) {
                    return $scope.rawHtml = response.data;
                });
            };
        }, {
            controller: controller,
            restrict: "E",
            link: link,
            templateUrl: "templates/gala_thumblist_nav.html",
            replace: !0,
            scope: {
                items: "="
            }
        };
    } ]), sfDirectives.directive("gallery", [ "$timeout", function() {
        var link, template;
        return link = function(scope, element) {
            var config, _ref;
            return null == scope.slides && (scope.slides = 1), scope.isThumblist = function() {
                return scope.slides > 1;
            }, config = {
                showArrows: !0
            }, scope.isFullHeight = function() {
                var _ref;
                return (null != (_ref = scope.full) ? _ref.length : void 0) > 0 && "true" === scope.full;
            }, scope.galleryClasses = function() {
                return scope.isThumblist() ? "gallery" : "single-image-gallery";
            }, (null != (_ref = element.parent()) ? _ref.is("p") : void 0) && element.parent().addClass("no-container"), 
            scope.isThumblist() ? (element.jScrollPane(config), scope.api = element.data("jsp"), 
            scope.$watch(function() {
                return element.find(".gallery-slide").length;
            }, function() {
                return setTimeout(function() {
                    null != scope.api && scope.api.reinitialise();
                }, 800);
            })) : void 0;
        }, template = '<div ng-class="galleryClasses()" ng-transclude></div>', {
            restrict: "E",
            link: link,
            template: template,
            transclude: !0,
            replace: !0,
            scope: {
                slides: "@"
            }
        };
    } ]), sfDirectives.directive("gallerySlide", [ "$location", function($location) {
        var link, result;
        return link = function(scope) {
            return null == scope.imageUrl && (scope.imageUrl = ""), null == scope.videoUrl && (scope.videoUrl = ""), 
            scope.youtubePattern = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11,11}).*$/, 
            scope.youtubeId = function() {
                return scope.videoUrl.match(scope.youtubePattern)[1];
            }, scope.hasImageUrl = function() {
                var _ref;
                return (null != (_ref = scope.imageUrl) ? _ref.length : void 0) > 0;
            }, scope.hasVideo = function() {
                var _ref;
                return (null != (_ref = scope.videoUrl) ? _ref.length : void 0) > 0;
            }, scope.getYoutubeVideoThumbnail = function() {
                return scope.hasVideo() ? "http://img.youtube.com/vi/" + scope.youtubeId() + "/1.jpg" : void 0;
            }, scope.getImage = function() {
                return scope.imageUrl || scope.getYoutubeVideoThumbnail();
            }, scope.displayInModalIfVideo = function() {
                return scope.hasVideo() ? (scope.$emit("modal:show", scope.videoUrl), $location.url($location.url() + "?video=" + scope.youtubeId())) : void 0;
            }, scope.slideType = function() {
                return scope.hasVideo() ? "links_to_video" : "plain_image";
            }, scope.backgroundImageStyle = {
                "background-image": "url(" + scope.getImage() + ")",
                "background-size": "cover"
            }, scope.imageStyle = {
                width: "530px"
            };
        }, result = {
            restrict: "E",
            replace: !0,
            templateUrl: "templates/gallery_slide.html",
            link: link,
            scope: {
                imageUrl: "@",
                videoUrl: "@"
            }
        };
    } ]), sfDirectives.directive("resizer", [ function() {
        return {
            restrict: "A",
            link: function(scope, elem) {
                return elem.on("load", function() {
                    var fixedHeightValue, h, ratio, w;
                    return fixedHeightValue = 525, ratio = $(this).height() / 520, w = $(this).width(), 
                    h = $(this).height(), elem.css({
                        width: "" + Math.round(w / ratio) + "px",
                        height: "525px"
                    });
                });
            }
        };
    } ]), sfDirectives.directive("homeThumblistNav", [ function() {
        var link;
        return link = function(scope) {
            var config;
            return config = {
                showArrows: !1
            }, setTimeout(function() {
                return scope.pane = $(".thumblist-nav"), scope.pane.jScrollPane(config);
            }, 1400);
        }, {
            restrict: "E",
            link: link,
            templateUrl: "templates/home_thumblist_nav.html",
            replace: !0,
            scope: {
                featured: "=",
                clickaction: "="
            }
        };
    } ]), sfDirectives.directive("instagramGallery", [ "$http", "Instagram", function($http, Instagram) {
        return {
            restrict: "E",
            scope: {},
            replace: !0,
            template: "<ul class='thumbs'>\n  <li ng-repeat=\"p in pics\">\n    <a href=\"{{p.link}}\" target=\"_blank\" ng-style=\"{'background-image': 'url(' + p.images.thumbnail.url + ')'}\">&nbsp;</a>\n  </li>\n</ul>\n",
            link: function(scope) {
                return scope.pics = [], Instagram.fetchLatest(function(data) {
                    return scope.pics = data;
                });
            }
        };
    } ]), sfDirectives.directive("latestBlogPost", [ "$http", "LatestBlog", function($http, LatestBlog) {
        return {
            restrict: "E",
            scope: {},
            replace: !0,
            template: '<section>\n  <div class="footer-list-item">\n    <h4>From our blog</h4>\n    <p>{{article.title}}</p>\n    <p class="align-right">{{article.date}}</p>\n  </div>\n  <p class="read-more"><a href="/blog#articles/{{article.id}}">Check out our blog &rarr;</a></p>\n</section>',
            link: function(scope) {
                return scope.article = {}, LatestBlog.fetchLatest().then(function(data) {
                    return scope.article = data;
                });
            }
        };
    } ]), sfDirectives.directive("missionsMap", [ "$timeout", function($timeout) {
        var controller, link;
        return link = function(scope) {
            return scope.worldMapObject = {}, scope.usMapObject = {}, scope.worldMapZIndex = 1, 
            scope.usMapZIndex = 0, scope.currentContinent = {}, scope.currentCountry = {}, scope.selectedList = {}, 
            scope.greetingFlag = !1, scope.mapConfig = {
                zoomOnScroll: !1,
                backgroundColor: "none",
                regionStyle: {
                    selected: {
                        fill: "#ffad20"
                    }
                },
                focusOn: {
                    x: .5,
                    y: .5,
                    scale: .5
                }
            }, scope.worldMapConfig = _.extend({
                map: "world_mill_en"
            }, scope.mapConfig), scope.usMapConfig = _.extend({
                map: "us_aea_en"
            }, scope.mapConfig), scope.selectTopLevelList = function(continent) {
                return scope.selectedList = continent, scope.greetingFlag = !0;
            }, scope.initializeMaps = function() {
                return $timeout(function() {
                    return $("#missions-world-map").vectorMap(scope.worldMapConfig), scope.worldMapObject = $("#missions-world-map").vectorMap("get", "mapObject"), 
                    $("#missions-us-map").vectorMap(scope.usMapConfig), scope.usMapObject = $("#missions-us-map").vectorMap("get", "mapObject");
                }, 1800);
            }, scope.hasContinentAndCountry = function() {
                return scope.hasContinent() || scope.hasCountry();
            }, scope.hasContinent = function() {
                var _ref;
                return null != (null != (_ref = scope.currentContinent) ? _ref.name : void 0);
            }, scope.hasCountry = function() {
                var _ref;
                return null != (null != (_ref = scope.currentCountry) ? _ref.name : void 0);
            }, scope.countryClass = function(name) {
                return (null != name ? name.length : void 0) ? "US" === name ? "states" : "countries" : void 0;
            }, scope.countryOrState = function() {
                return scope.hasContinent() ? scope.countryClass(scope.currentContinent.name) : void 0;
            }, scope.highlightContinentRegions = function(continent, mapObj) {
                var country, countryCodes, _i, _len, _ref;
                for (scope.currentContinent = continent, scope.currentCountry = {}, countryCodes = [], 
                _ref = continent.countries_visited, _i = 0, _len = _ref.length; _len > _i; _i++) country = _ref[_i], 
                countryCodes.push(country.abbreviation);
                return countryCodes.length > 0 ? (mapObj.clearSelectedRegions(), mapObj.setFocus(countryCodes, .2), 
                mapObj.setSelectedRegions(countryCodes)) : void 0;
            }, scope.highlightCountryRegion = function(country, mapObj) {
                return scope.currentCountry = country, mapObj.clearSelectedRegions(), mapObj.setFocus(country.abbreviation), 
                mapObj.setSelectedRegions(country.abbreviation);
            }, scope.bringUSMapToFront = function(flag, continent) {
                return flag === !0 ? (scope.worldMapZIndex = 0, scope.usMapZIndex = 1, scope.highlightContinentRegions(continent, scope.usMapObject)) : (scope.worldMapZIndex = 1, 
                scope.usMapZIndex = 0, scope.highlightContinentRegions(continent, scope.worldMapObject));
            }, scope.greetingClicked = function() {
                return scope.greetingFlag = !0;
            }, scope.initializeMaps();
        }, controller = function($scope) {
            return $scope.showContinent = function(continent) {
                return "US" === continent.name ? $scope.bringUSMapToFront(!0, continent) : $scope.bringUSMapToFront(!1, continent);
            }, $scope.showCountry = function(country, continent) {
                var countryCode, _ref;
                return countryCode = country.abbreviation, (null != countryCode ? countryCode.length : void 0) > 0 && (null != (_ref = country.total_hearing_aids_provided) ? _ref.length : void 0) > 0 ? "US" === continent.name ? ($scope.bringUSMapToFront(!0, continent), 
                $scope.highlightCountryRegion(country, $scope.usMapObject)) : ($scope.bringUSMapToFront(!1, continent), 
                $scope.highlightCountryRegion(country, $scope.worldMapObject)) : void 0;
            };
        }, {
            restrict: "E",
            link: link,
            controller: controller,
            templateUrl: "templates/missions_map.html",
            replace: !0,
            scope: {
                data: "="
            }
        };
    } ]), sfDirectives.directive("pageTile", [ function() {
        var link, result;
        return link = function(scope) {
            return null == scope.feedUrl && (scope.feedUrl = ""), null == scope.title && (scope.title = ""), 
            null == scope.date && (scope.date = ""), null == scope.year && (scope.year = ""), 
            null == scope.detailPage && (scope.detailPage = ""), null == scope.type && (scope.type = ""), 
            null == scope.featured && (scope.featured = ""), null == scope.headerImageUrl && (scope.headerImageUrl = ""), 
            null == scope.logoImageUrl && (scope.logoImageUrl = ""), null == scope.quote && (scope.quote = ""), 
            null == scope.callToActionText && (scope.callToActionText = ""), null == scope.callToActionLink && (scope.callToActionLink = ""), 
            null == scope.videoLink && (scope.videoLink = ""), scope.hasVideo = function() {
                var _ref;
                return (null != (_ref = scope.videoLink) ? _ref.length : void 0) > 0;
            }, scope.getCategory = function() {
                switch (scope.type) {
                  case "press_release":
                    return "Press Release";

                  case "media_mention":
                    return "Media Mention";

                  default:
                    return scope.category;
                }
            }, scope.parseDate = function(date) {
                return Date.parse(date);
            }, scope.linkByType = function() {
                var _ref, _ref1;
                return null != scope.type ? "media_mention" === scope.type ? (null != (_ref = scope.videoLink) ? _ref.length : void 0) > 0 ? "media_mention_with_video" : (null != (_ref1 = scope.detailPage) ? _ref1.length : void 0) > 0 && "true" === scope.detailPage ? "media_mention_with_detail_page" : "media_mention" : scope.type : "default";
            }, scope.displayInModalIfVideo = function() {
                return scope.hasVideo() ? scope.$emit("modal:show", scope.videoLink) : void 0;
            };
        }, result = {
            restrict: "E",
            replace: !0,
            templateUrl: "templates/page_tile.html",
            link: link,
            scope: {
                id: "@",
                callToActionLink: "@",
                callToActionText: "@",
                category: "@",
                date: "@",
                detailPage: "@",
                featured: "@",
                feedUrl: "@",
                headerImageUrl: "@",
                logoImageUrl: "@",
                quote: "@",
                title: "@",
                type: "@",
                videoLink: "@",
                year: "@"
            }
        };
    } ]), sfDirectives.factory("Pagination", function() {
        var pagination;
        return pagination = {}, pagination.getNew = function(perPage) {
            var paginator;
            return perPage = void 0 === perPage ? 5 : perPage, paginator = {
                numPages: 1,
                perPage: perPage,
                page: 0
            }, paginator.prevPage = function() {
                return paginator.page > 0 ? paginator.page -= 1 : void 0;
            }, paginator.nextPage = function() {
                return paginator.page < paginator.numPages - 1 ? paginator.page += 1 : void 0;
            }, paginator.toPageId = function(id) {
                return id >= 0 && id <= paginator.numPages - 1 ? paginator.page = id : void 0;
            }, paginator;
        }, pagination;
    }), sfDirectives.directive("panelTab", [ function() {
        var link;
        return link = function(scope) {
            return scope.hasVideo = function() {
                var _ref;
                return null != (null != (_ref = scope.featured) ? _ref.video_link_url : void 0);
            }, scope.displayInModalIfVideo = function() {
                return scope.$emit("modal:show", scope.featured.video_link_url);
            };
        }, {
            restrict: "E",
            templateUrl: "templates/panel_tab.html",
            replace: !0,
            link: link,
            scope: {
                featured: "="
            }
        };
    } ]), sfDirectives.directive("regionDropdown", [ function() {
        var link, result;
        return link = function(scope) {
            return scope.isActive = !1, scope.countryDropdownIsActive = !1, scope.yearDropdownIsActive = !1, 
            scope.currentRegion = {
                region: ""
            }, scope.currentRegionLabel = "REGIONS", scope.currentCountryLabel = "COUNTRIES", 
            scope.currentYearLabel = scope.yearsCollection[0].name, scope.chooseRegion = function(region) {
                return scope.currentRegion = region, scope.filterObject.region = region.region, 
                scope.filterObject.country = "", scope.currentRegionLabel = scope.currentRegion.region.length > 0 ? scope.currentRegion.region : "REGIONS", 
                scope.countryDropdownIsActive = !1, scope.currentCountryLabel = "COUNTRIES";
            }, scope.chooseCountry = function(country) {
                return scope.filterObject.country = country, scope.currentCountryLabel = country;
            }, scope.chooseYear = function(year) {
                return scope.filterObject.year = year.value, scope.currentYearLabel = year.name;
            }, scope.hasSelectedRegion = function() {
                return scope.currentRegion.region.length > 0;
            };
        }, result = {
            restrict: "E",
            transclude: !0,
            replace: !0,
            template: '<ul class="articles-filters desktop">\n  <li><strong>Sort</strong> &nbsp;|&nbsp;</li>\n  <li class="dropdown wide">\n    <div class="outer-dropdown-wrapper">\n      <div class="dropdown-wrapper" ng-click="yearDropdownIsActive=!yearDropdownIsActive" ng-class="{active: yearDropdownIsActive==true}">\n        <span>{{currentYearLabel}}</span>\n        <ul class="dropdown-list">\n          <li ng-repeat="year in yearsCollection"><a href ng-click="chooseYear(year)">{{year.name}}</a></li>\n        </ul>\n      </div>\n    </div>\n  </li>\n  <li class="dropdown widest">\n    <div class="outer-dropdown-wrapper">\n      <div class="dropdown-wrapper" ng-click="isActive=!isActive" ng-class="{active: isActive==true}">\n        <span>{{currentRegionLabel}}</span>\n        <ul class="dropdown-list">\n          <li><a href ng-click="chooseRegion({region:\'\',countries:[]})">REGIONS</a></li>\n          <li ng-repeat="region in regionsCollection"><a href ng-click="chooseRegion(region)">{{region.region}}</a></li>\n        </ul>\n      </div>\n    </div>\n  </li>\n  <li ng-show="hasSelectedRegion()">&nbsp;|&nbsp;</li>\n  <li class="dropdown wider">\n    <div class="outer-dropdown-wrapper" ng-show="hasSelectedRegion()">\n      <div class="dropdown-wrapper" ng-click="countryDropdownIsActive=!countryDropdownIsActive" ng-class="{active: countryDropdownIsActive==true}">\n        <span>{{currentCountryLabel}}</span>\n        <ul class="dropdown-list">\n          <li ng-click="chooseCountry(\'\')">Countries</li>\n          <li ng-repeat="country in currentRegion.countries"><a href ng-click="chooseCountry(country)">{{country}}</a></li>\n        </ul>\n      </div>\n    </div>\n  </li>\n</ul>',
            link: link,
            scope: {
                regionsCollection: "=",
                yearsCollection: "=",
                filterObject: "="
            }
        };
    } ]), sfDirectives.directive("scrollToPosition", [ function() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                var idToScrollTo;
                return idToScrollTo = attrs.scrollToPosition, element.on("click", function() {
                    return $("body").animate({
                        scrollTop: $("#" + idToScrollTo).offset().top
                    }, "slow");
                });
            },
            scope: {}
        };
    } ]), sfDirectives.directive("slide", [ function() {
        var controller, link, result;
        return link = function(scope) {
            return null == scope.detailPage && (scope.detailPage = ""), null == scope.imageUrl && (scope.imageUrl = ""), 
            null == scope.videoUrl && (scope.videoUrl = ""), null == scope.linkUrl && (scope.linkUrl = ""), 
            null == scope.linkText && (scope.linkText = ""), null == scope.headline && (scope.headline = ""), 
            null == scope.bodyCopy && (scope.bodyCopy = ""), null == scope.thumblist && (scope.thumblist = "false"), 
            null == scope.date && (scope.date = ""), null == scope.blogCategory && (scope.blogCategory = ""), 
            null == scope.quote && (scope.quote = ""), null == scope.backgroundColor && (scope.backgroundColor = ""), 
            null == scope.logoImageUrl && (scope.logoImageUrl = ""), null == scope.linkStyle && (scope.linkStyle = ""), 
            null == scope.layout && (scope.layout = ""), null == scope.subhead && (scope.subhead = ""), 
            scope.youtubePattern = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11,11}).*$/, 
            scope.hasSidePanel = function() {
                var _ref;
                return (null != (_ref = scope.layout) ? _ref.length : void 0) > 0 && "side-panel" === scope.layout;
            }, scope.youtubeId = function() {
                return null != scope.videoUrl.match(scope.youtubePattern) ? scope.videoUrl.match(scope.youtubePattern)[1] : "";
            }, scope.hasVideo = function() {
                var _ref;
                return (null != (_ref = scope.videoUrl) ? _ref.length : void 0) > 0;
            }, scope.hasBlogCategory = function() {
                var _ref;
                return (null != (_ref = scope.blogCategory) ? _ref.length : void 0) > 0;
            }, scope.hasDate = function() {
                var _ref;
                return (null != (_ref = scope.date) ? _ref.length : void 0) > 0;
            }, scope.hasDetailPage = function() {
                var _ref;
                return (null != (_ref = scope.detailPage) ? _ref.length : void 0) > 0 && "true" === scope.detailPage;
            }, scope.hasLinkText = function() {
                var _ref;
                return (null != (_ref = scope.linkText) ? _ref.length : void 0) > 0;
            }, scope.hasLinkStyle = function() {
                var _ref;
                return (null != (_ref = scope.linkStyle) ? _ref.length : void 0) > 0;
            }, scope.hasQuote = function() {
                var _ref;
                return (null != (_ref = scope.quote) ? _ref.length : void 0) > 0;
            }, scope.hasHeadline = function() {
                var _ref;
                return (null != (_ref = scope.headline) ? _ref.length : void 0) > 0;
            }, scope.hasBodyCopy = function() {
                var _ref;
                return (null != (_ref = scope.bodyCopy) ? _ref.length : void 0) > 0;
            }, scope.hasLogoImageUrl = function() {
                var _ref;
                return (null != (_ref = scope.logoImageUrl) ? _ref.length : void 0) > 0;
            }, scope.isThumblist = function() {
                var _ref;
                return (null != (_ref = scope.thumblist) ? _ref.length : void 0) > 0 && "true" === scope.thumblist;
            }, scope.hasSubhead = function() {
                var _ref;
                return (null != (_ref = scope.subhead) ? _ref.length : void 0) > 0;
            }, scope.getYoutubeVideoThumbnail = function() {
                var _ref;
                return scope.hasVideo() && (null != (_ref = scope.youtubeId()) ? _ref.length : void 0) > 0 ? "http://img.youtube.com/vi/" + scope.youtubeId() + "/1.jpg" : void 0;
            }, scope.getImage = function() {
                return scope.imageUrl || scope.getYoutubeVideoThumbnail();
            }, scope.backgroundImageStyle = scope.hasQuote() ? {
                background: scope.backgroundColor
            } : {
                "background-image": "url(" + scope.getImage() + ")"
            }, scope.actionLinkStyle = function() {
                return scope.isThumblist() ? "call-to-action " + scope.linkStyle : "action-link " + scope.linkStyle;
            }, scope.displayInModalIfVideo = function() {
                return scope.hasVideo() ? scope.$emit("modal:show", scope.videoUrl) : void 0;
            };
        }, controller = function() {}, result = {
            restrict: "E",
            controller: controller,
            replace: !0,
            templateUrl: function(elem, attr) {
                return null != attr.thumblist && "true" === attr.thumblist ? "templates/thumb_slide.html" : "templates/swipe_slide.html";
            },
            link: link,
            scope: {
                backgroundColor: "@",
                blogCategory: "@",
                bodyCopy: "@",
                date: "@",
                detailPage: "@",
                headline: "@",
                imageUrl: "@",
                layout: "@",
                linkStyle: "@",
                linkText: "@",
                linkUrl: "@",
                logoImageUrl: "@",
                quote: "@",
                subhead: "@",
                thumblist: "@",
                videoUrl: "@"
            }
        };
    } ]), sfDirectives.directive("swiper", [ "$timeout", function($timeout) {
        var controller, link;
        return link = function(scope, element, attrs) {
            var config, _ref, _ref1;
            null == scope.size && (scope.size = "tall"), scope.childSlides = element.children().eq(2).children().eq(0).children(), 
            config = void 0, config = {}, config.auto = (null != (_ref = attrs.auto) ? _ref.length : void 0) > 0 ? attrs.auto : !1, 
            config.speed = parseInt(attrs.speed, 10) || 500, attrs.disableScroll && (config.disableScroll = !!attrs.disableScroll), 
            attrs.continuous && (config.continuous = !!attrs.continuous), $timeout(function() {
                return scope.swipe = new Swipe(document.getElementById(scope.identifier), {
                    auto: config.auto,
                    speed: config.speed,
                    disableScroll: config.disableScroll,
                    continuous: config.continuous,
                    callback: function(pos) {
                        return scope.setAsCurrent(scope.swipeControls[pos]);
                    }
                });
            }, 1e3), scope.showPaginator = function() {
                return null != scope.paginator && "true" === scope.paginator;
            }, scope.hasSize = function() {
                return null != scope.size && scope.size.length > 0;
            }, scope.addSize = function() {
                var sizeClass;
                return scope.hasSize && (sizeClass = scope.size), sizeClass;
            }, scope.setAsCurrent = function(selectedSwipeControl) {
                angular.forEach(scope.swipeControls, function(swipeControl) {
                    swipeControl.safeApply(function() {
                        return swipeControl.toggleActiveState(selectedSwipeControl === swipeControl);
                    });
                });
            }, (null != (_ref1 = element.parent()) ? _ref1.is("p") : void 0) && element.parent().addClass("no-container");
        }, controller = function($scope) {
            $scope.next = function() {
                return $scope.swipe.next();
            }, $scope.prev = function() {
                return $scope.swipe.prev();
            }, $scope.slide = function(index) {
                return $scope.swipe.slide(index);
            }, $scope.stop = function() {
                return $scope.swipe.stop();
            }, $scope.swipeControls = [], this.setAsCurrent = function(selectedSwipeControl, pos) {
                angular.forEach($scope.swipeControls, function(swipeControl) {
                    selectedSwipeControl === swipeControl ? (swipeControl.isCurrent = !0, $scope.slide(pos), 
                    $scope.swipe.stop()) : swipeControl.isCurrent = !1;
                });
            }, this.addSwipeControl = function(swipeControl) {
                $scope.swipeControls.push(swipeControl);
            };
        }, {
            restrict: "EA",
            controller: controller,
            link: link,
            templateUrl: "templates/swipe.html",
            transclude: !0,
            replace: !0,
            scope: {
                identifier: "@",
                paginator: "@",
                size: "@"
            }
        };
    } ]), sfDirectives.directive("swipePaginator", [ "$compile", function() {
        var link;
        return link = function(scope, element, attrs, swiperController) {
            return scope.isCurrent = "0" === scope.position ? !0 : !1, swiperController.addSwipeControl(scope), 
            scope.toggle = function(pos) {
                swiperController.setAsCurrent(scope, pos);
            }, scope.toggleActiveState = function(flag) {
                return scope.isCurrent = flag;
            }, scope.safeApply = function(fn) {
                var phase;
                phase = this.$root.$$phase, "$apply" === phase || "$digest" === phase ? fn && "function" == typeof fn && fn() : this.$apply(fn);
            };
        }, {
            restrict: "E",
            template: '<li ng-click="toggle(position)" ng-class="{on:isCurrent==true}"></li>',
            transclude: !0,
            replace: !0,
            require: "^?swiper",
            link: link,
            scope: {
                position: "@"
            }
        };
    } ]), sfDirectives.directive("tabbedNav", [ "$window", function($window) {
        var link;
        return link = function(scope) {
            return scope.currentTab = 0, scope.navigateTo = function(tabIndex) {
                return scope.currentTab = tabIndex, $window.location.href = scope.tabs[tabIndex].link;
            };
        }, {
            restrict: "E",
            link: link,
            templateUrl: "templates/tabbed_nav.html",
            transclude: !0,
            replace: !0,
            scope: {
                tabClass: "@",
                tabs: "="
            }
        };
    } ]), sfDirectives.directive("thumblistNav", [ "$timeout", function($timeout) {
        var link, template;
        return link = function(scope, element) {
            var config, _ref;
            return config = {
                showArrows: !1
            }, $timeout(function() {
                return scope.pane = $(".thumblist-nav"), scope.pane.jScrollPane(config), scope.api = scope.pane.data("jsp");
            }, 400), scope.$watch(function() {
                return element.find(".slide").length;
            }, function() {
                return $timeout(function() {
                    null != scope.api && scope.api.reinitialise()();
                }, 200);
            }), scope.isFullHeight = function() {
                var _ref;
                return (null != (_ref = scope.full) ? _ref.length : void 0) > 0 && "true" === scope.full;
            }, scope.thumbClasses = function() {
                return scope.isFullHeight() ? "full thumblist thumblist-nav horizontal-only" : "thumblist thumblist-nav horizontal-only";
            }, (null != (_ref = element.parent()) ? _ref.is("p") : void 0) ? element.parent().addClass("no-container") : void 0;
        }, template = '<div ng-class="thumbClasses()" ng-transclude></div>', {
            restrict: "E",
            link: link,
            template: template,
            transclude: !0,
            replace: !0,
            scope: {
                full: "@"
            }
        };
    } ]), sfDirectives.directive("videoPlayerModal", [ "$window", function() {
        return {
            restrict: "E",
            scope: {
                show: "="
            },
            replace: !0,
            transclude: !0,
            link: function(scope, element, attrs) {
                return scope.dialogStyle = {}, attrs.width && (scope.dialogStyle.width = attrs.width), 
                attrs.height && (scope.dialogStyle.height = attrs.height), scope.playerDiv = angular.element(element.find("div")[3]), 
                scope.bodyDiv = document.getElementsByTagName("body")[0], scope.iframeContent = "", 
                scope.hideModal = function() {
                    return scope.show = !1, scope.$emit("modal:hide");
                }, scope.$watch("show", function(newVal, oldVal) {
                    return newVal && !oldVal ? (scope.iframeContent = newVal.replace(/(?:http(?:s?):\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<iframe width="100%" height="100%" src="http://www.youtube.com/embed/$1?autoplay=1" frameborder="0" allowfullscreen></iframe>'), 
                    scope.bodyDiv.style.overflow = "hidden") : (scope.bodyDiv.style.overflow = "", scope.iframeContent = "");
                });
            },
            template: "<div class='ng-modal' ng-show='show'>\n  <div class='ng-modal-overlay' ng-click='hideModal()'></div>\n  <div class='ng-modal-dialog' ng-style='dialogStyle'>\n    <div class='ng-modal-close' ng-click='hideModal()'>X</div>\n    <div class='ng-modal-dialog-content'>\n      <div class=\"player\" ng-bind-html=\"iframeContent\"></div>\n    </div>\n  </div>\n</div>"
        };
    } ]), sfDirectives.directive("worldMap", [ "$timeout", function($timeout) {
        return {
            restrict: "E",
            template: "<section class='map'><div id='map-popup'><div class='content'></div></div><div ng-transclude></div><div id='world-map-gdp'></div></section>",
            transclude: !0,
            replace: !0,
            scope: {
                markers: "="
            },
            link: function(scope) {
                var createImagePattern, generateMap;
                return createImagePattern = function(id, url) {
                    var image, pattern, svgMap, svgNS, svgNSXLink;
                    return svgMap = $(".jvectormap-container > svg").get(0), svgNS = "http://www.w3.org/2000/svg", 
                    svgNSXLink = "http://www.w3.org/1999/xlink", svgMap.setAttribute("xmlns", svgNS), 
                    svgMap.setAttribute("xmlns:link", svgNSXLink), svgMap.setAttribute("xmlns:ev", "http://www.w3.org/2001/xml-events"), 
                    pattern = document.createElementNS(svgNS, "pattern"), pattern.setAttribute("id", id), 
                    pattern.setAttribute("width", "30"), pattern.setAttribute("height", "30"), image = document.createElementNS(svgNS, "image"), 
                    image.setAttribute("x", "0"), image.setAttribute("y", "0"), image.setAttribute("width", "24"), 
                    image.setAttribute("height", "24"), image.setAttributeNS(svgNSXLink, "xlink:href", url), 
                    svgMap.appendChild(pattern), void pattern.appendChild(image);
                }, generateMap = function() {
                    var icon, markerList, _i, _len, _ref;
                    for (markerList = null != scope.markers ? scope.markers : {
                        coords: [],
                        icons: []
                    }, $("#world-map-gdp").vectorMap({
                        map: "world_mill_en",
                        markers: markerList.coords,
                        markersSelectableOne: !0,
                        zoomOnScroll: !1,
                        markerStyle: {
                            initial: {
                                "stroke-width": 0,
                                "stroke-opacity": 0,
                                r: 12
                            },
                            hover: {
                                stroke: "#1b74a4",
                                "stroke-opacity": 1,
                                "stroke-width": 2
                            }
                        },
                        onMarkerClick: function(event, index) {
                            var $popup, content;
                            return content = markerList.meta_data[index], $popup = $("#map-popup"), $popup.fadeOut("slow", function() {
                                return $popup.find(".content").empty().html("<span class='close' ng-click='closePopup()'>X</span><img src='" + content.thumbnail_url + "'/><div class='background-popup'><div class='text-popup'><h2>" + content.title + "</h2><span class='location'>" + content.location + "</span></span><p>" + content.text + "</p><p class='centered'><a class='read-more' href='" + content.action_target + "'>LEARN MORE</a></div></div>"), 
                                $popup.fadeIn(), $popup.find(".close").click(function() {
                                    return $popup.fadeOut();
                                });
                            });
                        }
                    }), _ref = markerList.icons, _i = 0, _len = _ref.length; _len > _i; _i++) icon = _ref[_i], 
                    createImagePattern(icon.id, icon.path);
                    return void 0;
                }, void $timeout(generateMap, 1200);
            }
        };
    } ]);
}.call(this), function() {
    var sfFilters;
    sfFilters = angular.module("sfFilters", [ "sfServices" ]), sfFilters.filter("startFrom", function() {
        return function(input, start) {
            return input.slice(+start);
        };
    }), sfFilters.filter("range", function() {
        return function(input, total) {
            var i;
            for (total = parseInt(total), i = 0; total > i; ) input.push(i), i++;
            return input;
        };
    }), sfFilters.filter("youtubeIframe", [ "$filter", "Youtube", function($filter, Youtube) {
        return function(value) {
            var videoid;
            return value ? (videoid = value.match(Youtube.regex()), null === videoid ? "" : "//www.youtube.com/embed/" + videoid[1]) : value;
        };
    } ]), sfFilters.filter("youtubeImage", [ "$filter", "Youtube", function($filter, Youtube) {
        return function(value, quality) {
            var videoid;
            return quality = quality || "default", value ? (videoid = value.match(Youtube.regex()), 
            null === videoid ? "" : "https://img.youtube.com/vi/" + videoid[1] + "/" + quality + ".jpg") : value;
        };
    } ]);
}.call(this), function() {
    var FB_ID, HomePageApp, blogPagesApp, galaPageApp, legalPagesApp, mediaMentionsPagesApp, missionsPageApp, previewPageApp, programsPageApp, requiredModules, takeActionPagesApp;
    requiredModules = [ "ngRoute", "ngAnimate", "ngSanitize", "truncate", "sfControllers", "sfDirectives", "sfFilters", "sfServices" ], 
    FB_ID = "1391926457745223", blogPagesApp = angular.module("blogPagesApp", requiredModules), 
    blogPagesApp.run(function($FB) {
        return $FB.init(FB_ID);
    }), blogPagesApp.run(function($rootScope, $location, $anchorScroll) {
        return $rootScope.$on("$routeChangeSuccess", function() {
            return $anchorScroll();
        });
    }), blogPagesApp.config([ "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/articles", {
            templateUrl: "partials/articles/index.html",
            controller: "BlogIndexCtrl",
            resolve: {
                api_data: [ "Articles", function(Articles) {
                    return Articles.getIndex().then(function(data) {
                        return data;
                    });
                } ]
            }
        }).when("/articles/:articleId", {
            templateUrl: function(params) {
                return "api/blog_detail/" + params.articleId;
            },
            controller: "BlogShowCtrl"
        }).otherwise({
            redirectTo: "/articles"
        });
    } ]), galaPageApp = angular.module("galaPageApp", requiredModules), galaPageApp.run(function($FB) {
        return $FB.init(FB_ID);
    }), galaPageApp.config([ "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/gala/:tabId", {
            templateUrl: function(params) {
                return "api/gala_" + params.tabId;
            },
            controller: "GalaCtrl"
        }).otherwise({
            redirectTo: "/gala/overview"
        });
    } ]), legalPagesApp = angular.module("legalPagesApp", requiredModules), legalPagesApp.run(function($FB) {
        return $FB.init(FB_ID);
    }), mediaMentionsPagesApp = angular.module("mediaMentionsPagesApp", requiredModules), 
    mediaMentionsPagesApp.run(function($FB) {
        return $FB.init(FB_ID);
    }), mediaMentionsPagesApp.run(function($rootScope, $location, $anchorScroll) {
        return $rootScope.$on("$routeChangeSuccess", function() {
            return $anchorScroll();
        });
    }), mediaMentionsPagesApp.config([ "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/media_mentions", {
            templateUrl: "partials/media_mentions/index.html",
            controller: "MediaMentionsIndexCtrl"
        }).when("/press_releases/:pressReleaseId", {
            templateUrl: "partials/press_releases/show.html",
            controller: "PressReleasesShowCtrl"
        }).when("/media_mentions/:mediaMentionId", {
            templateUrl: "partials/media_mentions/show.html",
            controller: "MediaMentionsShowCtrl"
        }).otherwise({
            redirectTo: "/media_mentions"
        });
    } ]), missionsPageApp = angular.module("missionsPageApp", requiredModules), missionsPageApp.run(function($FB) {
        return $FB.init(FB_ID);
    }), missionsPageApp.run(function($rootScope, $location, $anchorScroll) {
        return $rootScope.$on("$routeChangeSuccess", function() {
            return $anchorScroll();
        });
    }), missionsPageApp.config([ "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/missions", {
            templateUrl: "partials/missions/landing.html",
            controller: "MissionsPageCtrl"
        }).when("/highlights", {
            templateUrl: function() {
                return "partials/missions/index.html";
            },
            controller: "MissionsIndexCtrl"
        }).when("/missions/:articleId", {
            templateUrl: function(params) {
                return "api/missions_detail/" + params.articleId;
            },
            controller: "MissionsShowCtrl"
        }).otherwise({
            redirectTo: "/missions"
        });
    } ]), programsPageApp = angular.module("programsPageApp", requiredModules), programsPageApp.run(function($FB) {
        return $FB.init(FB_ID);
    }), programsPageApp.config([ "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/programs/:tabId", {
            templateUrl: function(params) {
                return "api/program_" + params.tabId;
            },
            controller: "ProgramsCtrl"
        }).otherwise({
            redirectTo: "/programs/0"
        });
    } ]), takeActionPagesApp = angular.module("takeActionPagesApp", requiredModules), 
    takeActionPagesApp.run(function($FB) {
        return $FB.init(FB_ID);
    }), takeActionPagesApp.config([ "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/:tabId", {
            templateUrl: function(params) {
                return "api/" + params.tabId;
            },
            controller: "TakeActionCtrl"
        }).otherwise({
            redirectTo: "/fundraising"
        });
    } ]), HomePageApp = angular.module("homePageApp", requiredModules), HomePageApp.run(function($FB) {
        return $FB.init("1391926457745223");
    }), previewPageApp = angular.module("previewPageApp", requiredModules), HomePageApp.run(function($FB) {
        return $FB.init(FB_ID);
    }), previewPageApp.config([ "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/articles/:articleId", {
            templateUrl: function(params) {
                return "api/preview/" + params.articleId;
            },
            controller: "PreviewShowCtrl"
        });
    } ]);
}.call(this), function() {
    $(function() {
        var header, mask, menu, submenus, trigger;
        return twitterFetcher.fetch("441358329231572992", "twitter", 1, !0), mask = $(".mobile-menu-mask"), 
        trigger = $(".mobile-menu-icon .icon"), menu = $(".mobile-menu"), submenus = $(".mobile-menu .main-menu > li"), 
        header = $("header"), trigger.click(function() {
            return mask.toggleClass("active"), menu.toggleClass("active"), header.toggleClass("active");
        }), mask.click(function() {
            return mask.removeClass("active"), menu.removeClass("active");
        }), submenus.click(function(e) {
            var submenu;
            return $(e.target).parents(".sub-menu").length > 0 ? void 0 : ($(".mobile-menu .main-menu > li.active").not($(this)).each(function() {
                var submenu;
                return submenu = $(this), $(this).children("ul").slideToggle(200, function() {
                    return submenu.toggleClass("active");
                });
            }), submenu = $(this), submenu.hasClass("active") ? submenu.children("ul").slideToggle(200, function() {
                return submenu.toggleClass("active");
            }) : (submenu.toggleClass("active"), submenu.children("ul").slideToggle(200)));
        }), $(window).resize(function() {
            return mask.removeClass("active"), menu.removeClass("active"), header.removeClass("active");
        });
    }), $(function() {
        var enteries, loadMore, mapAsFeed;
        return mapAsFeed = $(".map-as-feed-wrap"), enteries = $(".map-as-feed-wrap .entry"), 
        loadMore = $(".map-as-feed-wrap .load-more"), enteries.eq(0).show(), enteries.eq(1).show(), 
        enteries.length > 2 ? (loadMore.show(), loadMore.click(function() {
            return enteries = $(".map-as-feed-wrap .entry:hidden"), enteries.eq(0).fadeIn(200), 
            enteries.eq(1).fadeIn(200), $(".map-as-feed-wrap .entry:hidden").length ? void 0 : loadMore.hide();
        })) : void 0;
    }), $(window).load(function() {
        var loadMore;
        return loadMore = $(".articles-list .load-more"), $(".next-page-trigger").length > 0 ? loadMore.addClass("visible") : void 0;
    });
}.call(this), function() {
    "use strict";
    var sfServices;
    sfServices = angular.module("sfServices", [ "ngResource" ]), sfServices.factory("urlChooser", [ "$location", function($location) {
        var env, getDetailFormat, getIndexFormat, getUrl;
        switch ($location.host()) {
          case "127.0.0.1":
            env = "development";
            break;

          case "starkey.local":
            env = "staging";
            break;

          default:
            env = "production";
        }
        return getUrl = function() {
            switch (env) {
              case "development":
                return "/local/api";

              case "staging":
                return "http://starkey.local/api";

              default:
                return "/api";
            }
        }, getIndexFormat = function() {
            return "development" === env ? "/index.json" : "";
        }, getDetailFormat = function(id) {
            return "development" === env ? "" : "/" + id;
        }, {
            getUrl: getUrl(),
            getIndexFormat: getIndexFormat()
        };
    } ]), sfServices.factory("Article", [ "$q", "$http", "urlChooser", function($q, $http, urlChooser) {
        var getDetail;
        return getDetail = function(id) {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/articles/" + id).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getDetail: getDetail
        };
    } ]), sfServices.factory("Articles", [ "$q", "$http", "$resource", "urlChooser", function($q, $http, $resource, urlChooser) {
        var getIndex;
        return getIndex = function() {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/blog" + urlChooser.getIndexFormat).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getIndex: getIndex
        };
    } ]), sfServices.factory("LatestBlog", [ "$q", "$http", "urlChooser", function($q, $http, urlChooser) {
        var fetchLatest;
        return fetchLatest = function() {
            var deferred, endPoint;
            return endPoint = "" + urlChooser.getUrl + "/latest_blog", deferred = $q.defer(), 
            $http.get(endPoint).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            fetchLatest: fetchLatest
        };
    } ]), sfServices.factory("$FB", [ "$window", function($window) {
        return {
            init: function(fbId) {
                if (!fbId) throw "FB App Id Cannot be blank";
                this.fbId = fbId, $window.fbAsyncInit = function() {
                    FB.init({
                        appId: fbId,
                        channelUrl: "app/channel.html",
                        status: !0,
                        xfbml: !0
                    });
                }, function(d) {
                    var id, js, ref;
                    js = void 0, id = "facebook-jssdk", ref = d.getElementsByTagName("script")[0], d.getElementById(id) || (js = d.createElement("script"), 
                    js.id = id, js.async = !0, js.src = "//connect.facebook.net/en_US/all.js", ref.parentNode.insertBefore(js, ref));
                }(document);
            }
        };
    } ]), sfServices.factory("FeaturedArticle", [ "$q", "$http", "$resource", "urlChooser", function($q, $http, $resource, urlChooser) {
        var getIndex;
        return getIndex = function() {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/featured_articles" + urlChooser.getIndexFormat).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getIndex: getIndex
        };
    } ]), sfServices.factory("GalaItems", [ "$q", "$http", "$resource", "urlChooser", function($q, $http, $resource, urlChooser) {
        var getIndex;
        return getIndex = function() {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/gala_items").success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getIndex: getIndex
        };
    } ]), sfServices.factory("GalaTabs", [ "$q", "$http", "$resource", "urlChooser", function($q, $http, $resource, urlChooser) {
        var getIndex;
        return getIndex = function() {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/gala_tabs").success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getIndex: getIndex
        };
    } ]), sfServices.factory("HearingMissionArticle", [ "$q", "$http", "urlChooser", function($q, $http, urlChooser) {
        var getDetail;
        return getDetail = function(id) {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/missions_articles/" + id).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getDetail: getDetail
        };
    } ]), sfServices.factory("Instagram", [ "$http", function($http) {
        return {
            fetchLatest: function(callback) {
                var endPoint;
                return endPoint = "https://api.instagram.com/v1/users/331318543/media/recent/?client_id=1f359684e8ab4da6ae6ff618be26c638&callback=JSON_CALLBACK&count=4", 
                $http.jsonp(endPoint).success(function(response) {
                    return callback(response.data);
                });
            }
        };
    } ]), sfServices.factory("MapMarker", [ "$q", "$http", "$resource", "urlChooser", function($q, $http, $resource, urlChooser) {
        var getIndex;
        return getIndex = function() {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/homepage_markers" + urlChooser.getIndexFormat).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getIndex: getIndex
        };
    } ]), sfServices.factory("MissionsPage", [ "$q", "$http", "$resource", "urlChooser", function($q, $http, $resource, urlChooser) {
        var getPage;
        return getPage = function() {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/missions_page" + urlChooser.getIndexFormat).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getPage: getPage
        };
    } ]), sfServices.factory("MissionsIndex", [ "$q", "$http", "$resource", "urlChooser", function($q, $http, $resource, urlChooser) {
        var getIndex;
        return getIndex = function() {
            var deferred, url;
            return deferred = $q.defer(), url = "" + urlChooser.getUrl + "/missions_highlights" + urlChooser.getIndexFormat, 
            $http.get(url).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getIndex: getIndex
        };
    } ]), sfServices.factory("MissionsMapMarker", [ "$q", "$http", "$resource", "urlChooser", function($q, $http, $resource, urlChooser) {
        var getIndex;
        return getIndex = function() {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/missions_markers" + urlChooser.getIndexFormat).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getIndex: getIndex
        };
    } ]), sfServices.factory("MediaMentionOrPressItem", [ "$q", "$http", "$resource", "urlChooser", function($q, $http, $resource, urlChooser) {
        var getIndex;
        return getIndex = function() {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/press" + urlChooser.getIndexFormat).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getIndex: getIndex
        };
    } ]), sfServices.factory("PressRelease", [ "$resource", "urlChooser", function($resource, urlChooser) {
        return $resource("" + urlChooser.getUrl + "/press_releases/:pressReleaseId.json", {}, {});
    } ]), sfServices.factory("Preview", [ "$q", "$http", "urlChooser", function($q, $http, urlChooser) {
        var getDetail;
        return getDetail = function(id) {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/preview/" + id).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getDetail: getDetail
        };
    } ]), sfServices.factory("MediaMention", [ "$resource", "urlChooser", function($resource, urlChooser) {
        return $resource("" + urlChooser.getUrl + "/media_mentions/:mediaMentionId.json", {}, {});
    } ]), sfServices.factory("ProgramContent", [ "$q", "$http", "urlChooser", function($q, $http, urlChooser) {
        var getResource;
        return getResource = function(programContentId) {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/program_" + programContentId).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getResource: getResource
        };
    } ]), sfServices.factory("ProgramPartnership", [ "$q", "$http", "urlChooser", function($q, $http, urlChooser) {
        var getIndex;
        return getIndex = function() {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/program_partnerships" + urlChooser.getIndexFormat).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getIndex: getIndex
        };
    } ]), sfServices.factory("ProgramResource", [ "$q", "$http", "urlChooser", function($q, $http, urlChooser) {
        var getIndex;
        return getIndex = function() {
            var deferred;
            return deferred = $q.defer(), $http.get("" + urlChooser.getUrl + "/program_resources" + urlChooser.getIndexFormat).success(function(data) {
                return deferred.resolve(data);
            }).error(function(reason) {
                return deferred.reject(reason);
            }), deferred.promise;
        }, {
            getIndex: getIndex
        };
    } ]), sfServices.service("Youtube", [ function() {
        var regex;
        return regex = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/, 
        {
            regex: function() {
                return regex;
            }
        };
    } ]);
}.call(this), function() {
    var HeaderTabNav, ProgramsPageView, TabBehavior, __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    }, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
        return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
        child;
    };
    TabBehavior = function() {
        function TabBehavior() {
            this.setActiveLink = __bind(this.setActiveLink, this), this.setupListeners();
        }
        return TabBehavior.prototype.rootElement = $(document), TabBehavior.prototype.setupListeners = function() {
            var _this = this;
            return this.rootElement.on("click", "li", function(e) {
                return e.preventDefault(), _this.removeActiveClass(), _this.hideTabbedContent(), 
                _this.setActiveLink(e.currentTarget), _this.makeActive($(e.currentTarget));
            });
        }, TabBehavior.prototype.setActiveLink = function(link) {
            var selected_tab;
            return selected_tab = $(link).find("a").data().contentClass, $(selected_tab).fadeIn();
        }, TabBehavior.prototype.makeActive = function($item) {
            return $item.addClass("active");
        }, TabBehavior.prototype.removeActiveClass = function() {
            return this.rootElement.find("li").removeClass("active");
        }, TabBehavior.prototype.hideTabbedContent = function() {
            return this.rootElement.find(".tab-content").hide();
        }, TabBehavior;
    }(), HeaderTabNav = function(_super) {
        function HeaderTabNav() {
            this.hideTabbedContent(), HeaderTabNav.__super__.constructor.apply(this, arguments);
        }
        return __extends(HeaderTabNav, _super), HeaderTabNav.prototype.rootElement = $(".header-nav"), 
        HeaderTabNav.prototype.setupListeners = function() {
            var _this = this;
            return this.rootElement.on("click", "ul.tabs li", function(e) {
                var isActive;
                return e.preventDefault(), isActive = $(e.currentTarget).hasClass("active"), _this.removeActiveClass(), 
                _this.hideTabbedContent(), isActive ? void 0 : (_this.setActiveLink(e.currentTarget), 
                _this.makeActive($(e.currentTarget)));
            });
        }, HeaderTabNav;
    }(TabBehavior), ProgramsPageView = function() {
        function ProgramsPageView() {
            this.setupListeners();
        }
        return ProgramsPageView.prototype.setupListeners = function() {
            return $(document).on("click", ".become-a-provider", function(e) {
                return e.preventDefault(), $(".programs-page .become-a-provider-container").toggleClass("hidden");
            });
        }, ProgramsPageView;
    }(), $(function() {
        return new HeaderTabNav(), $(".programs-page").length ? new ProgramsPageView() : void 0;
    });
}.call(this);