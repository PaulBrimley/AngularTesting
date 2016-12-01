angular.module('testApp').factory('adminPanelMockupSvc', function ($resource) {
    var baseLink = '../data/';
    return {
        get: function (link, params, userInfo) {
            return $resource(baseLink + link, undefined, {
                get: {method: 'GET'}
            }).get().$promise.then(function (response) {
                if (params) {
                    var responseArray = [];
                    if (response[params]) {
                        response[params].map(function (user) {
                            if (user.name.toLowerCase().indexOf(userInfo.toLowerCase()) > -1 || user.id.toLowerCase().indexOf(userInfo.toLowerCase()) > -1) {
                                responseArray.push(user);
                            }
                        });
                    }
                    return responseArray;
                } else {
                    return response;
                }
            });
        }

    }
});