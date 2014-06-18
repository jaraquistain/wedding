AW.namespace('AW.Controllers.Nav');
(function (namespace) {
    namespace.controller = function ($scope) {
        $('#navigation').sticky({'topSpacing':0});
        $scope.$root.navItems = [
            {
                'title': 'Info',
                'route': '/info'
            },
            {
                'title': 'RSVP',
                'route': '/rsvp'
            },
            {
                'title': 'Registry',
                'route': '/registry'
            }
        ];

        Cookies.get('vegas-ok') && $scope.$root.navItems.length === 3 && $scope.$root.navItems.push({
            'title': 'Vegas',
            'route': '/vegas'
        });

    };
    namespace.controller.$inject = ['$scope'];
})(AW.Controllers.Nav);