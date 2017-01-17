angular.module('testApp').directive('employeeForm', function ($uibModal, formService) {
   return {
       restrict: 'E',
       templateUrl: '../views/formDirective.html',
       link: function(scope, elem, attr) {
           scope.employee = formService.employee;
           scope.departments = ['Engineering', 'Marketing','Finance','Administration'];
           scope.editableEmployee = angular.copy(scope.employee);

           scope.popup1 = {
               opened: false
           };

           //disables weekend selection
           function disabled(data) {
               var date = data.date,
                   mode = data.mode;
               return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
           }
           scope.dateOptions = {
               formatYear: 'yy'
           };

            scope.dateValidator = /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$/;

           scope.open1 = function() {
               scope.popup1.opened = true;
           };

           scope.submit = function () {
               scope.employee = angular.copy(scope.editableEmployee);
               console.log(scope.employee);
           };

           scope.cancel = function () {
               console.log(scope.employee);
           };
       }
   }
});

angular.module('testApp').directive('formatDate', ['$filter', function($filter) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModelController) {
            /*ngModelController.$parsers.push(function(data) {
                return data;
            });
            ngModelController.$formatters.push(function(data) {
                var tempDate = new Date(data);
                var newTempDate = new Date(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate(), tempDate.getUTCHours(), tempDate.getUTCMinutes(), tempDate.getUTCSeconds(), tempDate.getUTCMilliseconds());
                var newDate = $filter('date')(newTempDate, 'yyyy-MM-dd');
                return newDate;
            });*/
        }
    }
}]);