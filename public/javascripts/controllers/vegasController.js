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
        $(document).ready(function () {
            $('.gmap').hide();
            $("#maps span").click(function () {
                var $this = $(this);
                $this.next("div").fadeToggle();
                $('.gmap').not($this.next("div")).fadeOut();
            });
        });
        var currentCenter;
        function init_map() {
            var myOptions = {
                zoom: 14,
                center: new google.maps.LatLng(36.1023786,-115.17454650000002),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
            marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(36.1023786,-115.17454650000002)
            });
            infowindow = new google.maps.InfoWindow({
                content: "<b>Little White Wedding Chapel</b><br/>1301 S Las Vegas Blvd"
            });
            google.maps.event.addListener(marker, "click", function () {
                infowindow.open(map, marker);
            });
            currentCenter = map.getCenter();
        }

        function centerMap() {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(currentCenter);
        }

        //google.maps.event.addDomListener(window, 'load', init_map);
        //google.maps.event.addDomListener(window, 'resize', centerMap);
    };
    namespace.controller.$inject = ['$scope'];
})(AW.Controllers.Vegas);