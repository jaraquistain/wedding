AW.namespace('AW.Controllers.Test');
(function(namespace) {
    namespace.controller = function($scope) {
        $scope.guests = [];
        $scope.setGuests = function(guestArray) {
            $scope.guests = guestArray;
        };
    };
    namespace.controller.$inject = ['$scope'];
})(AW.Controllers.Test);