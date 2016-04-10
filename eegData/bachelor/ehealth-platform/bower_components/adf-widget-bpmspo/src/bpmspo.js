'use strict';

angular.module('adf.widget.bpmspo', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('bpmspo', {
        title: 'Pulse',
        description: 'This widget shows your pulse and SPO2 concentration in real time',
        templateUrl: '{widgetsPath}/bpmspo/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/bpmspo/src/edit.html'
        }
      });
  });
