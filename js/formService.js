angular.module('testApp').factory('formService', function () {
    return {
        employee: {
            fullName: 'Paul Brimley',
            notes: 'Best ever',
            department: 'Admin',
            perkCar: true,
            perkStock: false,
            perkSixWeeks: true,
            payrollType: 'none'
        }
    }
});