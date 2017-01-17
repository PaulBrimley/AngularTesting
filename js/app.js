var app = angular.module('testApp', ['ngAnimate','ngMessages', 'ui.mask', 'ui.router', 'ngResource','ui.bootstrap']);



app.filter('groupFilter', function () {
    return function(items, groupsRoles){
        var newArray = [];
        items.map(function (item) {
            var truethy = false;
            for (var prop in groupsRoles) {
                if (item.name === groupsRoles[prop].group) {
                    truethy = true;
                }
            }
            if (!truethy) {
                newArray.push(item);
            }
        })
        return newArray;
    }
});

app.directive('itCategoryTable', function(adminPanelMockupSvc) {
   return {
       restrict: 'E',
       templateUrl: '../views/itCategoryTableDirective.html',
       scope: {
         tableData: '='
       },
       link: function(scope, elem, attr) {

       }
   }
});
app.directive('itRoleTable', function() {
    return {
        restrict: 'E',
        templateUrl: '../views/itRoleTableDirective.html',
        scope: {
            tableData: '='
        },
        link: function(scope, elem, attr) {

        }
    }
});
app.directive('itResourceTable', function() {
    return {
        restrict: 'E',
        templateUrl: '../views/itResourceTableDirective.html',
        scope: {
            tableData: '='
        },
        link: function(scope, elem, attr) {

        }
    }
});
app.directive('itGroupRole', function() {
    return {
        restrict: 'E',
        templateUrl: '../views/itGroupRoleTableDirective.html',
        scope: {
            tableData: '='
        },
        link: function(scope, elem, attr) {

        }
    }
});
app.directive('itAdminMainPanel', function() {
    return {
        restrict: 'E',
        templateUrl: '../views/itPanels/itAdminMainPanel.html',
        scope: {
            panelData: '='
        },
        link: function(scope, elem, attr) {
            scope.selectItem = function () {
                if (scope.panelData.selectedItem) {
                    scope.selectedItem = angular.copy(scope.panelData.selectedItem);
                    scope.selectedItem.editMode = false;
                } else {
                    scope.selectedItem = {};
                }

            }
        }
    }
});
app.directive('inputField', function() {
    return {
        restrict: 'E',
        templateUrl: '../views/inputFieldDirective.html',
        scope: {
            data: '='
        },
        link: function(scope, elem, attr) {

        }
    }
});

app.controller('categoryModalCtrl', function($scope, $uibModalInstance) {
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss()
    };
});

app.controller('groupRoleModalCtrl', function($scope, $uibModalInstance) {
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss()
    };
});

app.controller('roleModalCtrl', function($scope, $uibModalInstance) {
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss()
    };
});

app.controller('resourceModalCtrl', function($scope, $uibModalInstance) {
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss()
    };
});

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {


    $stateProvider
        .state('resourceAdminMockup', {
            url: '/resourceAdminMockup',
            templateUrl: 'views/resourceAdminMockup.html',
            controller: function($scope, adminPanelMockupSvc, $uibModal) {
                $scope.categories = {
                    title: 'Category',
                    titlePlural: 'Categories',
                    panel: './views/itPanels/categoryPanel.html',
                    modalOpener: function() {
                        $uibModal.open({
                            templateUrl: '../views/itModals/categoryModal.html',
                            controller: 'categoryModalCtrl',
                            size: 'md'
                        });
                    },
                    data: {}
                };
                $scope.groups = [];
                $scope.groupsRoles = {
                    title: 'Group-to-Role',
                    titlePlural: 'Groups-to-Roles',
                    panel: './views/itPanels/groupRolePanel.html',
                    modalOpener: function() {
                        $uibModal.open({
                            templateUrl: '../views/itModals/groupRoleModal.html',
                            controller: 'groupRoleModalCtrl',
                            size: 'md'
                        });
                    },
                    data: {}
                };
                $scope.roles = {
                    title: 'Role',
                    titlePlural: 'Roles',
                    panel: './views/itPanels/rolePanel.html',
                    modalOpener: function() {
                        $uibModal.open({
                            templateUrl: '../views/itModals/roleModal.html',
                            controller: 'roleModalCtrl',
                            size: 'md'
                        });
                    },
                    data: {}
                };
                $scope.resources = {
                    title: 'Resource',
                    titlePlural: 'Resources',
                    panel: './views/itPanels/resourcePanel.html',
                    modalOpener: function() {
                        $uibModal.open({
                            templateUrl: '../views/itModals/resourceModal.html',
                            controller: 'resourceModalCtrl',
                            size: 'md'
                        });
                    },
                    data: {}
                };
                $scope.rolesResources = {};
                $scope.rolesResourcesMethods = {};

                $scope.reset = function (item) {
                    item.selectedItem = null;
                    console.log('clicked', item);
                };

                adminPanelMockupSvc.get('adMockGroups.json').then(function (test0) {
                    $scope.groups = test0['groups'];
                });

                adminPanelMockupSvc.get('adminPanelMockCategories.json').then(function (test1) {
                    test1['categories'].map(function (category) {
                        $scope.categories.data[category.id] = {
                            id: category.id,
                            name: category.name
                        }
                    });

                    adminPanelMockupSvc.get('adminPanelMockRoles.json').then(function (test2) {
                        test2['roles'].map(function (role) {
                            $scope.roles.data[role.id] = {
                                id: role.id,
                                category: $scope.categories.data[role.category],
                                name: role.name,
                                resources: {}
                            }
                        });
                        adminPanelMockupSvc.get('adminPanelMockResources.json').then(function (test3) {
                            test3['resources'].map(function (resource) {
                                $scope.resources.data[resource.id] = {
                                    id: resource.id,
                                    name: resource.name,
                                    category: $scope.categories.data[resource.category],
                                    type: resource.type
                                };
                            });
                            adminPanelMockupSvc.get('adminRolesResources.json').then(function (test4) {
                                test4['rolesResources'].map(function(rolesResource) {
                                    $scope.rolesResources[rolesResource.id] = rolesResource;
                                });
                                adminPanelMockupSvc.get('adminRolesResourcesMethods.json').then(function (test5) {
                                    test5['rolesResourcesMethods'].map(function(rolesResourcesMethod) {
                                        $scope.rolesResourcesMethods[rolesResourcesMethod.id] = rolesResourcesMethod;
                                    });
                                    adminPanelMockupSvc.get('adGroupsRoles.json').then(function (test6) {
                                        test6['groupsRoles'].map(function (groupsRole) {
                                            $scope.groupsRoles.data[groupsRole.id] = {
                                                id: groupsRole.id,
                                                name: groupsRole.group,
                                                role: $scope.roles.data[groupsRole.role]
                                            };
                                        });
                                        for (var prop in $scope.rolesResources) {
                                            $scope.roles.data[$scope.rolesResources[prop].roleId].resources[$scope.rolesResources[prop].resourceId] = {
                                                id: $scope.rolesResources[prop].resourceId,
                                                name: $scope.resources.data[$scope.rolesResources[prop].resourceId].name,
                                                methods: getResourceMethods($scope.rolesResources[prop].resourceId)
                                            };
                                        }

                                        function getResourceMethods(resourceId) {
                                            var arrayHolder = [];
                                            for (var prop in $scope.rolesResourcesMethods) {
                                                if ($scope.rolesResourcesMethods[prop].rolesResourceId === resourceId) {
                                                    arrayHolder.push($scope.rolesResourcesMethods[prop].method);
                                                }
                                            }
                                            return arrayHolder;
                                        }
                                    });
                                });
                            });
                        });
                    });
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
    // $locationProvider.html5Mode(true);
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
});

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
