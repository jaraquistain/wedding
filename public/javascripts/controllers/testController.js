AW.namespace('AW.Controllers.Test');
(function(namespace) {
    namespace.controller = function($scope) {
        $scope.guests = [];
        $scope.setGuests = function(guestArray) {
            $scope.guests = guestArray;
            console.log('guests:', $scope.guests);
        };

        $scope.confirmedFilter = {
            'confirmed': true
        };

        $scope.notConfirmedFilter = {
            'confirmed': false
        };

    };
    namespace.controller.$inject = ['$scope'];
})(AW.Controllers.Test);