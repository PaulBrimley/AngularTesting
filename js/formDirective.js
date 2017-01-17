angular.module('testApp').directive('employeeForm', function ($uibModal, formService) {
   return {
       restrict: 'E',
       templateUrl: '../views/formDirective.html',
       link: function(scope, elem, attr) {
           scope.employee = formService.employee;
           scope.departments = ['Engineering', 'Marketing','Finance','Administration'];
           scope.editableEmployee = angular.copy(scope.employee);
           scope.dateOptions = {
               dateDisabled: disabled,
               formatYear: 'yy',
               maxDate: new Date(2020, 5, 22),
               minDate: new Date(),
               startingDay: 1
           };
           scope.popup1 = {
               opened: false
           };

           function disabled(data) {
               var date = data.date,
                   mode = data.mode;
               return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
           }



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