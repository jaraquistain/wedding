AW.namespace('AW.Controllers.Test');
(function (namespace) {
    namespace.controller = function ($scope, $http) {
        $scope.guests = [];
        $scope.setGuests = function (guestArray) {
            $scope.guests = guestArray;
        };

        $scope.newGuest = {
            'firstName': null,
            'lastName':  null,
            'address':   {
                'street1': null,
                'street2': null,
                'city':    null,
                'state':   null,
                'zip':     null
            },
            'email':     null,
            'phone':     null,
            'confirmed': false
        };

        $scope.newGuest = $scope.newGuest = {'address': {}, 'confirmed': false};

        $scope.confirmedFilter = {
            'confirmed': true
        };

        $scope.notConfirmedFilter = {
            'confirmed': false
        };

        $scope.update = function(guest) {
            $http.put('/guests/' + guest._id + '.json', guest).success(function(data) {
                if (!data._id) {
                    console.log('error response:', data);
                }
            });
        };

        $scope.addNewGuest = function(){
            if ($scope.newGuestForm.$valid) {
                $http.post('/guests.json', $scope.newGuest).success(function(response){
                    if (response._id) {
                        $scope.guests.unshift(response);
                        $scope.newGuest = $scope.newGuest = {'address': {}, 'confirmed': false};
                        $scope.newGuest = {'address': {}, 'confirmed': false}
                    } else {
                        console.warn('something ain\'t right');
                    }
                });
            } else {
                console.log('form is invalid');
            }
        };
    };
    namespace.controller.$inject = ['$scope', '$http'];
})(AW.Controllers.Test);