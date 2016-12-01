angular.module('testApp').directive('employeeForm', function ($uibModal, formService) {
   return {
       restrict: 'E',
       templateUrl: '../views/formDirective.html',
       link: function(scope, elem, attr) {
           scope.employee = formService.employee;
           scope.departments = ['Engineering', 'Marketing','Finance','Administration'];
           scope.editableEmployee = angular.copy(scope.employee);


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