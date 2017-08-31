/**
 * Created by Seth on 8/23/2017.
 */
(function(){
    angular.module('app').directive('getStartedDir', function(){
        return {
            restrict: 'E',
            templateUrl: './directives/get-started/getStarted.html',
            controller: 'getStartedCtrl'
        }
    })
})();