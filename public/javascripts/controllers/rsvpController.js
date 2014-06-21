AW.namespace('AW.Controllers.Rsvp');
(function (namespace) {
    namespace.controller = function ($scope, $http) {
        $scope.hideGuestList = false;
        $scope.hideThanks = true;

        var nameRegex = /([^\s]+)(?: )?(.*)/;

        $scope.setData = function (invites, guests) {
            $scope.invites = invites || [];
            $scope.guests = guests || [];
        };
        $scope.nameFilter = function (guest) {
            var match = $scope.name ? $scope.name.match(nameRegex) : null,
                first = match ? match[1].toLowerCase() : null,
                last = match ? match[2].toLowerCase() : null,
                gFirst = guest.firstName.toLowerCase(),
                gLast = guest.lastName.toLowerCase();

            return !last && first && gFirst.indexOf(first) >= 0 || (last && first === gFirst && gLast.indexOf(last) >= 0);
        };

        $scope.inviteFilter = function (invite) {

        };

        $scope.getInvites = function (guest) {
            $scope.name = guest.firstName + ' ' + guest.lastName;
            $scope.activeGuestId = guest._id;
            $scope.hideGuestList = true;
            $scope.showInvites = true;
        };

        $scope.checkInput = function () {
            $scope.hideGuestList && clear();
            $scope.hideThanks = true;
        };

        $scope.updateInvite = function (invite) {
            $scope.loading = true;
            $scope.processingGuests = invite.guests.length;
            var unbindWatch = $scope.$watch('processingGuests', function (count) {
                if (count <= 0) {
                    unbindWatch();
                    invite.submitted = true;
                    $http.put('/invites/' + invite._id, invite).success(function (response) {
                        if (response._id) {
                            $scope.name = null;
                            $scope.hideThanks = false;
                            clear();
                            $scope.loading = false;
                        } else {
                            $scope.loading = false;
                            alert('there was a problem saving the invite, try again later');
                        }
                    });
                }
            });

            invite.guests.forEach(function (guest) {
                if ($scope.stop) return;
                $http.put('/guests/' + guest._id + '.json', guest).success(function (data) {
                    if (!data._id) {
                        console.log('error response:', data);
                        $scope.stop = true;
                        alert('there was a problem updating your guest list, try again later');
                    } else {
                        --$scope.processingGuests;
                    }
                });
            });
        };

        var clear = function () {
            $scope.hideGuestList = false;
            $scope.activeGuestId = undefined;
            $scope.showInvites = false;
        }

    };
    namespace.controller.$inject = ['$scope', '$http'];
})(AW.Controllers.Rsvp);