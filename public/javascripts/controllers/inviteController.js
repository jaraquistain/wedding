AW.namespace('AW.Controllers.Invite');
(function (namespace) {
    namespace.controller = function ($scope, $http) {
        $scope.setData = function (inviteArray, guestArray, showAll) {
            $scope.guest = guestArray && guestArray._id ? guestArray : undefined;
            $scope.invite = inviteArray && inviteArray._id ? inviteArray : undefined;
            $scope.guests = $scope.guest ? undefined : guestArray || [];
            $scope.invites = $scope.invite ? undefined : inviteArray || [];

            if (!$scope.invite && showAll) {
                window.location = '/invites';
            }
        };

        $scope.newInviteGuestsList = [];

        $scope.guests && $scope.guests.forEach(function(guest, index){

        });
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

        $scope.updateInvite = function(){
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
                $http.put('/invites/' + $scope.invite._id, { '_id:': $scope.invite._id, 'guests': guests }).success(function(response){
                    if (response._id) {
                        $scope.invite = response;
                        $scope.newInviteGuestsList = [];
                    } else {
                        console.warn('something ain\'t right');
                    }
                });
            } else {
                console.log('form is invalid');
            }
        };

        $scope.remove = function(id) {
            $http.delete('/invites/' + $scope.invite._id).success(function(response){
                $scope.invites && $scope.invites.forEach(function(invite, index) {
                    if (invite._id === id) {
                        $scope.invites.splice(index, 1);
                    }
                });
                window.location = $scope.invite ? '/invites' : window.location;
            });
        }
    };
    namespace.controller.$inject = ['$scope', '$http'];
})(AW.Controllers.Invite);