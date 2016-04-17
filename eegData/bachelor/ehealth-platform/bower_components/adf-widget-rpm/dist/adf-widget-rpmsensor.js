(function(window, undefined) {'use strict';


var app = angular.module('adf.widget.rpmsensor', ['adf.provider', 'highcharts-ng']);
app.config(["dashboardProvider", function(dashboardProvider){
  dashboardProvider
    .widget('rpmsensor', {
      title: 'RPM',
      description: 'This widget shows a chart of your breath rate',
      templateUrl: '{widgetsPath}/rpmsensor/src/view.html',
      controller: 'rpmController',
      controllerAs: 'rpm',
      reload:true,
      edit: {
        templateUrl: '{widgetsPath}/rpmsensor/src/edit.html'
      }
    });
}]);

app.factory('socket', function(){
  var socket = io.connect('http://127.0.1.1:3000')
  return socket;
});

app.controller('rpmController', ["$scope", "$interval", "socket", function($scope, $interval, socket){
  var rpm = this;

  //$scope.msgs = [];
  //
  //$scope.sendMsg = function(){
  //  socket.emit('send msg', $scope.msg.text);
  //};
  //
  //socket.on('get msg', function (data) {
  //  $scope.msgs.push(data);
  //  bpm.data = data;
  //  $scope.$digest();
  //})

  socket.on('breathe data', function (brData) {

    var dataArray = new Array();
    for(var i=0; i<brData.length; i++){
      dataArray.push({x: parseFloat(brData[i].frequency), y: parseFloat(brData[i].magnitude)});
    }

    $scope.chartConfig = {
      chart: {
        type: 'line',
        animation: false,
        zoomType: 'x'
      },
      title: {
        text: 'Live RPM'
      },
      plotOptions: {
        line: {
          marker: {
            enabled: false
          }
        },
        series: {
          turboThreshold: 0
        }
      },
      xAxis: {
        type: 'categories',
        tickPixelInterval: 100,
      },
      yAxis: {
        title: {
          text: 'Magnitude'
        },
        max:0.5,
        min:0
      },
      series:[{
        name: 'RPM',
        data: dataArray
      }]
    };


    $scope.$digest();
  });

}]);

angular.module("adf.widget.rpmsensor").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/rpmsensor/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
$templateCache.put("{widgetsPath}/rpmsensor/src/view.html","<div ng-controller=rpmController><div ng-if=chartConfig><highchart id=chart1 config=chartConfig></highchart></div></div>");}]);})(window);