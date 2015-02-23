"use strict";

angular.module('ionicApp', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('eventmenu', {
            url: "/event",
            abstract: true,
            templateUrl: "templates/event-menu.html"
        })
        .state('eventmenu.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html"
                }
            }
        })
        .state('eventmenu.checkin', {
            url: "/settings",
            views: {
                'menuContent': {
                    templateUrl: "templates/settings.html",
                    controller: "SettingsCtrl"
                }
            }
        });

    $urlRouterProvider.otherwise("/event/home");
})

.service('localStorageService', function() {

    this.saveData = function(data) {
        window.localStorage.setItem("data", data);
    };

    this.retrieveData = function() {
        return window.localStorage.getItem("data");
    };

    this.deleteData = function() {

    };

})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, localStorageService) {
    $scope.settings = {
        frequency: 'FW',
        network: 'NW',
        onoff: true
    };

    if (localStorageService.retrieveData()) {
        $scope.settings = JSON.parse(localStorageService.retrieveData());
        console.log("storage ", $scope.settings);
    }

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
})

.controller('SettingsCtrl', function($scope, localStorageService) {

    $scope.frequencies = [{
        text: 'Every Day',
        value: 'FD'
    }, {
        text: 'Every Sunday',
        value: 'FW'
    }, {
        text: 'Every Alternate Sunday',
        value: 'FWA'
    }, {
        text: 'First Day of Every Month',
        value: 'FM'
    }];

    $scope.networks = [{
        text: 'Wifi and Mobile Data',
        value: 'NM'
    }, {
        text: 'Wifi Only',
        value: 'NW'
    }];

    $scope.change = function() {
        console.log("change ", JSON.stringify($scope.settings));
        localStorageService.saveData(JSON.stringify($scope.settings));
    };
});
