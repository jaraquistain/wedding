AW.namespace('AW.Controllers.Rsvp');
(function (namespace) {
    namespace.controller = function ($scope) {
        $scope.hideGuestList = false;
        var nameRegex = /([^\s]+)(?: )?(.*)/;

        $scope.setData = function(invites, guests) {
            $scope.invites = invites || [];
            $scope.guests = guests || [];
        };
        $scope.nameFilter= function(guest) {
            var match = $scope.name ? $scope.name.match(nameRegex) : null,
                first = match ? match[1].toLowerCase() : null,
                last = match ? match[2].toLowerCase() : null,
                gFirst = guest.firstName.toLowerCase(),
                gLast = guest.lastName.toLowerCase();

            return !last && first && gFirst.indexOf(first) >= 0 || (last && first === gFirst && gLast.indexOf(last) >= 0);
        };

        $scope.inviteFilter = function(invite) {

        };

        $scope.getInvites = function(guest) {
            $scope.name = guest.firstName + ' ' + guest.lastName;
            $scope.activeGuestId = guest._id;
            $scope.hideGuestList = true;
            $scope.showInvites = true;
        };

        $scope.checkInput = function() {
            $scope.hideGuestList && clear();
        };

        var clear = function() {
            $scope.hideGuestList = false;
            $scope.activeGuestId = undefined;
            $scope.showInvites = false;
        }
    };
    namespace.controller.$inject = ['$scope'];
})(AW.Controllers.Rsvp);