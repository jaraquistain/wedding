AW.namespace('AW.Controllers.Info');
(function (namespace) {
    namespace.controller = function ($scope) {
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
                center: new google.maps.LatLng(37.7802903, -122.3915351),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
            marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(37.7802903, -122.3915351)
            });
            infowindow = new google.maps.InfoWindow({
                content: "<b>Tres</b><br/>130 Townsend Street"
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

        google.maps.event.addDomListener(window, 'load', init_map);
        google.maps.event.addDomListener(window, 'resize', centerMap);

    };
    namespace.controller.$inject = ['$scope'];
})(AW.Controllers.Info);