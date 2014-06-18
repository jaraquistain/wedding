AW.namespace('AW.Controllers.Registry');
(function (namespace) {
    namespace.controller = function ($scope) {
        $scope.navItems = [
            {
                'title': 'Info',
                'route': '/info'
            }
        ]

    };
    namespace.controller.$inject = ['$scope'];
})(AW.Controllers.Registry);