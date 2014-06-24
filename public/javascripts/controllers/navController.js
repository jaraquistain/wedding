AW.namespace('AW.Controllers.Nav');
(function (namespace) {
    namespace.controller = function ($scope) {
        $scope.$root.navItems = [
            {
                'title': 'Home',
                'route': '/'
            },
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
        Cookies.get('vegas-ok') && $scope.$root.navItems.length === 4 && $scope.$root.navItems.push({
            'title': 'Vegas!',
            'route': '/vegas'
        });
        $('#navigation').sticky({'topSpacing':0});

        $scope.setData = function(tab) {
            console.log('set active to:', tab);
            $scope.activeTab = tab;
        };


    };
    namespace.controller.$inject = ['$scope'];
})(AW.Controllers.Nav);