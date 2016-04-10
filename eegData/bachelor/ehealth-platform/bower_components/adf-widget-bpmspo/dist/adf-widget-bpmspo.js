(function(window, undefined) {'use strict';


angular.module('adf.widget.bpmspo', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('bpmspo', {
        title: 'Pulse',
        description: 'This widget shows your pulse and SPO2 concentration in real time',
        templateUrl: '{widgetsPath}/bpmspo/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/bpmspo/src/edit.html'
        }
      });
  }]);

angular.module("adf.widget.bpmspo").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/bpmspo/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
$templateCache.put("{widgetsPath}/bpmspo/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");}]);})(window);