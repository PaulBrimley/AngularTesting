var app = angular.module('testApp', ['ngAnimate','ngMessages', 'ui.mask', 'ui.router', 'ngResource','ui.bootstrap']);



app.filter('roleFilter', function () {
    return function(items, category){
        console.log(items, category);
        if (category) {
            var newArray = [];
            items.map(function(item) {
                if (item.category === category) {
                    newArray.push(item);
                }
            });
            console.log(newArray);
            return newArray;
        } else {
            return items;
        }

    }
});


app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('resourceAdminMockup', {
            url: '/resourceAdminMockup',
            templateUrl: 'views/resourceAdminMockup.html',
            controller: function($scope, adminPanelMockupSvc) {
                $scope.categories = [];
                $scope.roles = [];
                $scope.resources = [];
                $scope.rolesResources = [];
                $scope.rolesResourcesMethods = [];
                adminPanelMockupSvc.get('adminPanelMockCategories.json').then(function (test) {
                    $scope.categories = test['categories'];
                });
                adminPanelMockupSvc.get('adminPanelMockRoles.json').then(function (test) {
                    $scope.roles = test['roles'];
                });
                adminPanelMockupSvc.get('adminPanelMockResources.json').then(function (test) {
                    $scope.resources = test['resources'];
                });
                adminPanelMockupSvc.get('adminRolesResources.json').then(function (test) {
                    $scope.rolesResources = test['rolesResources'];
                });
                adminPanelMockupSvc.get('adminRolesResourcesMethods.json').then(function (test) {
                    $scope.rolesResourcesMethods = test['rolesResourcesMethods'];
                });
            },
            data: {
                pageTitle: 'Resource Admin'
            }
        })
        .state('systemAdminMockup', {
            url: '/systemAdminMockup',
            templateUrl: 'views/systemAdminMockup.html',
            controller: function($scope, adminPanelMockupSvc) {

                $scope.search = function () {
                    $scope.foundUsers = [];
                    adminPanelMockupSvc.get('adminPanelMockUser.json', 'users', $scope.userToSearch).then(function (test) {
                        if (test.length > 0) {
                            $scope.foundUsers = test;
                            $scope.userTosearch = '';
                        } else {
                            $scope.foundUsers.push({name: 'None', id: -1})
                        }

                    });
                };

                $scope.userSelected = function () {
                    console.log('User selected')
                }
            },
            data: {
                pageTitle: 'System Admin'
            }
        })
        .state('ngPattern', {
            url: '/ngPattern',
            templateUrl: 'views/ngPattern.html',
            controller: 'ngPatternCtrl',
            data: {
                pageTitle: 'ngPattern'
            }
        })
        .state('ngSwitch', {
            url: '/ngSwitch',
            templateUrl: 'views/ngSwitch.html',
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
            templateUrl: 'views/ngSwitch-list.html',
            controller: function($scope) {

            },
            data: {
                pageTitle: 'ngSwitchList'
            }
        })
        .state('ngMessages', {
            url: '/ngMessages',
            templateUrl: 'views/ngMessages.html',
            controller: function($scope) {
                $scope.testClick = function (errorMessage) {
                    console.log(errorMessage);
                }
            },
            data: {
                pageTitle: 'ngMessages w/ Validation'
            }
        })
        .state('uiMask', {
            url: '/uiMask',
            templateUrl: 'views/uiMask.html',
            controller: function($scope) {

            },
            data: {
                pageTitle: 'uiMask'
            }
        })
        .state('ngList', {
            url: '/ngList',
            templateUrl: 'views/ngList.html',
            controller: function($scope) {

            },
            data: {
                pageTitle: 'ngList'
            }
        })
        .state('animate', {
            url: '/animate',
            templateUrl: 'views/animate.html',
            controller: function($animate, $animateCss, $scope) {
                $scope.filterThis = '';
                $scope.show = true;
                $scope.list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
                $scope.remove = function(index) {
                    $scope.list.splice(index, 1);
                };
                $scope.add = function(item) {

                    $scope.list.push(item);
                    $scope.item = '';
                };
                $scope.shuffle = function(a) {
                    var j, x, i;
                    for (i = a.length; i; i--) {
                        j = Math.floor(Math.random() * i);
                        x = a[i - 1];
                        a[i - 1] = a[j];
                        a[j] = x;
                    }
                }
            },
            data: {
                pageTitle: 'animate'
            }
        })
        .state('animate2', {
            url: '/animate2',
            templateUrl: 'views/animate2.html',
            controller: function($animate, $animateCss, $scope) {
                var bouncer;
                $scope.moveIt = function(event) {
                    var element = angular.element(event.target);
                    var container = element.parent();

                    var xDir = true;
                    var yDir = true;


                    function bouncer() {

                        
                        $animateCss(element, {
                            from: {left: 0, top: 0},
                            to: {left: goX, top: goY}
                        });
                    }

                    /*bouncer = $animateCss(element, {
                        from: {left: 0, top: 0},
                        to: {left: (randomIntFromInterval() + '%'), top: (container.height() - element.height() - 1 + 'px')},
                        duration: 1
                    });*/

                };

                $scope.endMovement = function () {
                    bouncer.end();
                }
            },
            data: {
                pageTitle: 'animate2'
            }
        })
        .state('angularUiForms', {
            url: '/angularForms',
            templateUrl: 'views/angularForms.html',
            controller: function($scope, $uibModal) {
                $scope.openModal = function() {
                    var modal = $uibModal.open({
                        templateUrl: '../views/modalForm.html',
                        controller: 'formController',
                        size: 'md'
                    });
                    modal.result.then(function (data) {
                        console.log(data);
                    }).catch(function (test) {
                        console.log('here in test', test)
                    })
                }
            },
            data: {
                pageTitle: 'Angular UI Forms'
            }
        });
    $urlRouterProvider.otherwise('/resourceAdminMockup');
});

app.controller('mainCtrl', function ($rootScope, $scope, $state) {
    $scope.states = [];
    $state.get().map(function (state) {
       if (!state.abstract) {
           $scope.states.push(state.name);
       }
    });
    $scope.navigateStates = function (state) {
        $state.transitionTo(state);
    };

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.pageTitle = $state.current.data.pageTitle;
        }
    );
});

app.controller('formController', function($scope, formService, $uibModal, $uibModalInstance) {
    //this controller is run every time the modal opens
    $scope.employee = formService.employee;
    $scope.departments = ['Engineering', 'Marketing','Finance','Administration'];
    $scope.editableEmployee = angular.copy($scope.employee);


    $scope.submit = function () {
        $scope.employee = angular.copy($scope.editableEmployee);
        $uibModalInstance.close($scope.employee);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss($scope.employee);
    };
})

app.animation('.animate-this-thing', ['$animateCss', function($animateCss) {
    return {
        enter: function(element, done) {
            return $animateCss(angular.element(element), {
                // addClass: 'animateIt'
                from: { opacity: 0 },
                to: { opacity: 1 },
                duration: .5
            });
        },
        leave: function(element, done) {
            return $animateCss(angular.element(element), {
                // addClass: 'animateIt'
                from: { opacity: 1 },
                to: { opacity: 0 },
                duration: .5
            });
        },
        move: function(element, done) {
            console.log(element);
            return $animateCss(angular.element(element), {
                addClass: 'animateIt'
            });
        }
    }
}]);
