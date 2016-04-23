'use strict';

var app = angular.module('adf.widget.bpmchart', ['adf.provider', 'highcharts-ng']);
app.config(function(dashboardProvider){
    dashboardProvider
      .widget('bpmchart', {
        title: 'Pulse Chart',
        description: 'A chart of your pulse change in time',
        templateUrl: '{widgetsPath}/bpmchart/src/view.html',
        controller: 'bpmchController',
        controllerAs: 'bpmch',
        reload:true,
        edit: {
          templateUrl: '{widgetsPath}/bpmchart/src/edit.html'
        }
      });
  });

app.factory('socket', function(){
  var socket = io.connect('http://127.0.1.1:3000')
  return socket;
});

var dataArray = new Array();

app.controller('bpmchController', function($scope, $interval, socket) {
  var rpm = this;

  socket.on('bpmchart data', function (brData) {

    if (dataArray.length < 10) {
      dataArray.push({x: dataArray.length, y: brData});
    }
    else {
      $scope.chartConfig = {
        options: {
          chart: {
            type: 'line',
            animation: false,
            zoomType: 'x'
          },
          plotOptions: {
            line: {
              marker: {
                enabled: false
              },
              animation: {
                duration: 0
              }
            },
            series: {
              turboThreshold: 10000
            }
          }
        },
        title: {
          text: 'Pulse Chart'
        },
        xAxis: {
          type: 'categories',
          tickPixelInterval: 100,
        },
        yAxis: {
          title: {
            text: 'BPM'
          },
          max: 120,
          min: 0
        },
        series: [{
          name: 'RPM',
          data: dataArray
        }]
      };

      $scope.$digest();

      dataArray.length = 0
      dataArray.push({x: dataArray.length, y: brData});
    }

  });
});
