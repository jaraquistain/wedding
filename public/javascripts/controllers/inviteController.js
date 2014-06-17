AW.namespace('AW.Controllers.Invite');
(function (namespace) {
    namespace.controller = function ($scope, $http) {
        $scope.setData = function (guestArray, inviteArray) {
            $scope.guests = guestArray || [];
            $scope.invites = inviteArray || [];
        };

        $scope.newInviteGuestsList = [];

//        $scope.guests = [];

//
//        $scope.newGuest = {
//            'firstName': null,
//            'lastName':  null,
//            'address':   {
//                'street1': null,
//                'street2': null,
//                'city':    null,
//                'state':   null,
//                'zip':     null
//            },
//            'email':     null,
//            'phone':     null,
//            'confirmed': false
//        };
//
//        $scope.newGuest = $scope.newGuest = {'address': {}, 'confirmed': false};
//
//        $scope.confirmedFilter = {
//            'confirmed': true
//        };
//
//        $scope.notConfirmedFilter = {
//            'confirmed': false
//        };
//
//        $scope.update = function(guest) {
//            $http.put('/guests/' + guest._id + '.json', guest).success(function(data) {
//                if (!data._id) {
//                    console.log('error response:', data);
//                }
//            });
//        };
//
        $scope.addNewInvite = function(){
            var i = 0,
                l = $scope.newInviteGuestsList.length,
                guests = [];

            for (i; i < l; i++) {
                if ($scope.newInviteGuestsList[i]) {
                    console.log('push index:', i);
                    guests.push($scope.guests[i]);
                }
            }
            if ($scope.newInviteForm.$valid) {
                $http.post('/invites.json', { 'guests': guests }).success(function(response){
                    if (response._id) {
                        $scope.invites.unshift(response);
                        $scope.newInviteGuestsList = [];
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
})(AW.Controllers.Invite);