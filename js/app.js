var app = angular.module('testApp', ['ngMessages', 'ui.mask', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('ngPattern', {
            url: '/ngPattern',
            templateUrl: 'ngPattern.html',
            controller: function($scope) {
                $scope.text = 'asdf@asdf.com';
                $scope.regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                $scope.click = function(thingy) {
                    console.log(thingy);
                }
            },
            data: {
                pageTitle: 'ngPattern'
            }
        })
        .state('ngSwitch', {
            url: '/ngSwitch',
            templateUrl: 'ngSwitch.html',
            controller: function($scope) {
                $scope.items = ['', 'First', 'Second', 'Third', 'Fourth'];
                $scope.selection = $scope.items[0];
                $scope.name2 = [];
                $scope.testCase = function() {
                    if ($scope.name2.length < 3) {
                        return 'less';
                    } else if ($scope.name2.length > 6) {
                        return 'more';
                    }
                };
                $scope.testClick = function (errorMessage) {
                    console.log(errorMessage.$error);
                }
            },
            data: {
                pageTitle: 'ngSwitch'
            }
        })
        .state('ngSwitch.list', {
            url: '/ngSwitchList',
            templateUrl: 'ngSwitch-list.html',
            controller: function($scope) {

            },
            data: {
                pageTitle: 'ngSwitchList'
            }
        })
        .state('ngMessages', {
            url: '/ngMessages',
            templateUrl: 'ngMessages.html',
            controller: function($scope) {
                $scope.testClick = function (errorMessage) {
                    console.log(errorMessage);
                }
            },
            data: {
                pageTitle: 'ngMessages'
            }
        })
        .state('uiMask', {
            url: '/uiMask',
            templateUrl: 'uiMask.html',
            controller: function($scope) {

            },
            data: {
                pageTitle: 'uiMask'
            }
        })
        .state('ngList', {
            url: '/ngList',
            templateUrl: 'ngList.html',
            controller: function($scope) {

            },
            data: {
                pageTitle: 'ngList'
            }
        });
    $urlRouterProvider.when('', '/ngList')
});

app.controller('mainCtrl', function ($scope, $state) {
    $scope.states = ['ngList','ngPattern', 'ngSwitch', 'ngSwitch.list', 'ngMessages', 'uiMask'];
    $scope.navigateStates = function (state) {
        $state.transitionTo(state);
    };
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.pageTitle = $state.current.data.pageTitle;
        }
    );
});