angular.module('testApp').factory('adminPanelMockupSvc', function ($resource, $http) {
    var baseLink = '../data/';
    var baseLink2 = 'https://webapi-dev.equilife.com';
    $http.defaults.headers.common.Authorization = 'bearerba8b2af40d991b527a5712298dcd9e60546d17bacb720a845fba009cf1cd0dd1';
    var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    return {
        get: function (url, params, userInfo) {
            return $resource(baseLink + url, {
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
        },
        save: function(url, data) {
            return $resource(baseLink + url, {
                save: {method: 'POST'}
            }).save(data).$promise.then(function (response) {
                console.log(response);
                return response;
            })
        }
    }
});