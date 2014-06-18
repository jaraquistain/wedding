AW.namespace('AW.Controllers.Info');
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
})(AW.Controllers.Info);