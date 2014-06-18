AW.namespace('AW.Controllers.Vegas');
(function (namespace) {
    namespace.controller = function ($scope) {
        if (!Cookies.get('vegas-ok')) {
            console.log('set the cookie');
            Cookies.set('vegas-ok', true, {
                'expires': '01/01/2015'
            });
            $scope.$root.navItems.push({
                'title': 'Vegas',
                'route': '/vegas'
            })
        }
    };
    namespace.controller.$inject = ['$scope'];
})(AW.Controllers.Vegas);