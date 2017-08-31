/**
 * Created by Seth on 8/30/2017.
 */
(function(){

    angular.module('app').directive('mobileNavDir', function(){
            return {
                restrict: 'E',
                templateUrl: './directives/mobile-nav/mobile-nav.html',
                controller: 'mobileNavCtrl'
            }
    });

})();


