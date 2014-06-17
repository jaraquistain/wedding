/**
 * Created by jaraquistain on 6/14/14.
 */
AW.namespace("AW.App");
(function (namespace) {
    //////////////////////////////
    // Angular Module
    //////////////////////////////
    namespace.module = angular.module('AW', []);

    //////////////////////////////
    // Angular Controllers
    //////////////////////////////
    namespace.module
        .controller('TestController', AW.Controllers.Test.controller)
        .controller('InviteController', AW.Controllers.Invite.controller);
}(AW.App));