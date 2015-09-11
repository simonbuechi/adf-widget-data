(function(window, undefined) {'use strict';


angular.module('adf.widget.data', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider){

    dashboardProvider
      .widget('bignumber', {
        title: 'Data Big',
        description: 'Display json data in big size',
        controller: 'bignumberCtrl',
        templateUrl: '{widgetsPath}/data/src/view-big.html',
        edit: {
          templateUrl: '{widgetsPath}/data/src/edit.html'
        },
        resolve: {
          feed: ["jsonNumberService", "config", function(jsonNumberService, config){
            if (config.url){
              return jsonNumberService.get(config.url, config.thresholds);
            }
          }]
        }
      })
      .widget('smallnumber', {
        title: 'Data Small',
        description: 'Display json data in small size',
        controller: 'smallnumberCtrl',
        templateUrl: '{widgetsPath}/data/src/view-small.html',
        edit: {
          templateUrl: '{widgetsPath}/data/src/edit.html'
        },
        resolve: {
          feed: ["jsonNumberService", "config", function(jsonNumberService, config){
            if (config.url){
              return jsonNumberService.get(config.url, '');
            }
          }]
        }
      })
      .widget('drupalbignumber', {
        title: 'Data Big Drupal',
        description: 'Display data from Drupal',
        controller: 'smallnumberCtrl',
        templateUrl: '{widgetsPath}/data/src/view-small.html',
        edit: {
          templateUrl: '{widgetsPath}/data/src/edit.html'
        },
        resolve: {
          feed: ["jsonDrupalService", "config", function(jsonDrupalService, config){
            if (config.url){
              return jsonDrupalService.get(config.url, '');
            }
          }]
        }
      })
      .widget('todoist', {
        title: 'Data Todoist',
        description: 'Display data from Todoist',
        controller: 'todoistCtrl',
        templateUrl: '{widgetsPath}/data/src/view-todoist.html',
        edit: {
          templateUrl: '{widgetsPath}/data/src/edit-todoist.html'
        },
        resolve: {
          feed: ["todoistService", "config", function(todoistService, config){
            if (config.token){
              return todoistService.get(config.token);
            }
          }]
        }
      });
  }])
  .controller('bignumberCtrl', ["$scope", "feed", "config", function($scope, feed, config){
    $scope.feed = feed;

    $scope.highlightClass = function(entry) {

      if (entry.threshigh) {
        if((entry.value > entry.threshigh && !config.inverse) || (entry.value < entry.threslow && config.inverse)) {
          return 'greenflag';
        } else if ((entry.value < entry.threslow && !config.inverse) || (entry.value > entry.threshigh && config.inverse)) {
          return 'redflag'
        } else {
          return '';
        }
      }

    };
  }])
  .controller('smallnumberCtrl', ["$scope", "feed", function($scope, feed){
    $scope.feed = feed;
  }])
  .controller('todoistCtrl', ["$scope", "feed", function($scope, feed){
    $scope.feed = feed;
  }]);


angular.module("adf.widget.data").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/data/src/edit-todoist.html","<form role=form><div class=form-group><label for=url>Iframe URL</label> <input type=url class=form-control id=url ng-model=config.url placeholder=\"Enter iframe url\"> <label for=height>Height</label> <input type=text class=form-control id=height ng-model=config.height placeholder=\"Enter height (e.g. 240px)\"> <label for=width>Width</label> <input type=text class=form-control id=width ng-model=config.width placeholder=\"Enter width (e.g. 320px)\"></div></form>");
$templateCache.put("{widgetsPath}/data/src/edit.html","<form role=form><div class=form-group><label for=url>Data source URL</label> <input type=url class=form-control id=url ng-model=config.url placeholder=\"Enter data source url (json)\"> <label for=thresholds>Thresholds</label> <input type=checkbox class=form-control id=thresholds ng-model=config.thresholds> <label for=inverse>Inverse (for thresholds only)</label> <input type=checkbox class=form-control id=inverse ng-model=config.inverse> <label for=about>About</label> <textarea class=form-control id=about ng-model=config.about></textarea></div></form>");
$templateCache.put("{widgetsPath}/data/src/view-big.html","<div class=news><div class=\"alert alert-info\" ng-if=!feed>Please insert a feed url in the widget configuration</div><div ng-repeat=\"entry in feed\" class=\"col-md-6 col-sm-12 col-lg-4 wall\"><div class=bignumber-value ng-class=highlightClass({{entry}})>{{entry.value}}</div><div class=bignumber-title>{{entry.name}}</div></div></div>");
$templateCache.put("{widgetsPath}/data/src/view-small.html","<div class=news><div class=\"alert alert-info\" ng-if=!feed>Please insert a json url in the widget configuration</div><ul class=list-unstyled><li ng-repeat=\"entry in feed\">{{entry.name}}: <span class=smallnumber-value>{{entry.value}}</span></li></ul></div>");
$templateCache.put("{widgetsPath}/data/src/view-todoist.html","<div class=news><div class=\"alert alert-info\" ng-if=!feed>Please insert a valid token in the widget configuration</div><div class=\"col-md-6 col-sm-6 col-lg-4\"><div class=bignumber-value>{{feed.karma}}</div><div class=bignumber-title>current karma</div></div><div class=\"col-md-6 col-sm-6 col-lg-4\"><div class=bignumber-value>{{feed.karma_trend}}</div><div class=bignumber-title>karma trend</div></div><div class=\"col-md-6 col-sm-6 col-lg-4\"><div class=bignumber-value>{{feed.completed_count}}</div><div class=bignumber-title>total tasks</div></div><ul class=list-unstyled ng-init=\"ddd = feed.days_items\"><li ng-repeat=\"n in ddd\">{{n.date}}: <span class=smallnumber-value>{{n.total_completed}}</span></li></ul></div>");}]);})(window);