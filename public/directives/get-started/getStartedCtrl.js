/**
 * Created by Seth on 8/23/2017.
 */
(function(){
    angular.module('app').controller('getStartedCtrl', function($scope, mainService){

        $scope.ctaShow = function () {
            TweenMax.to(document.getElementById('cta-pop-up'), 0.5, {
                ease: Power2.easeIn,
                left: 0
            })
        };

        $scope.ctaHide = function(){
            TweenMax.to(document.getElementById('cta-pop-up'), 0.5, {
                ease: Power2.easeOut,
                left: '-101%'
            })
        }

    })
})();