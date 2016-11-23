angular.module('testApp').controller('ngPatternCtrl', function($scope) {
    $scope.text = 'asdf@asdf.com';
    $scope.regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.click = function(thingy) {
        console.log(thingy);
    }
});