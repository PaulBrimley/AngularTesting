angular.module('testApp').factory('formService', function () {
    return {
        employee: {
            fullName: 'Paul Brimley',
            notes: 'Best ever',
            department: 'Administration',
            perkCar: true,
            perkStock: false,
            perkSixWeeks: true,
            payrollType: 'ten99',
            dateHired: new Date(1982, 6, 16)
        }
    }
});