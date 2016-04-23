/**
 * Created by aleksejs on 16.10.4.
 */

var app = angular.module('sample', ['adf', 'adf.structures.base', 'adf.widget.clock', 'adf.widget.bpmspo',
                          'adf.widget.rpmsensor', 'adf.widget.bpmchart', 'LocalStorageModule'])
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('adf');
    })
    .controller('sampleCtrl', function($scope, localStorageService) {
        var name = 'sample';
        var model = localStorageService.get(name);

        $scope.name = name;
        $scome.model = model;
        
        $scope.on('adfDashboardChanged', function (event, name, model) {
            localStorageService.set(name,model);
        })
    });

