AW.namespace('AW.Controllers.Test');
(function (namespace) {
    namespace.controller = function ($scope, $http) {
        $scope.guests = [];
        $scope.setGuests = function (guestArray) {
            $scope.guests = guestArray;
            console.log('guests:', $scope.guests);
        };

        $scope.guestTemplate = {
            'firstName': '',
            'lastName':  '',
            'address':   {
                'street1': '',
                'street2': '',
                'city':    '',
                'state':   '',
                'zip':     ''
            },
            'email':     '',
            'phone':     '',
            'confirmed': false
        };

        $scope.newGuest = angular.extend({}, $scope.guestTemplate);

        $scope.confirmedFilter = {
            'confirmed': true
        };

        $scope.notConfirmedFilter = {
            'confirmed': false
        };

        $scope.addNewGuest = function(){
            $http.post('/guests.json', $scope.newTodo).success(function(response){
                $scope.guests = response.guests;
                $scope.newGuest = angular.extend({}, $scope.guestTemplate);
            });
        };

    };
    namespace.controller.$inject = ['$scope', '$http'];
})(AW.Controllers.Test);