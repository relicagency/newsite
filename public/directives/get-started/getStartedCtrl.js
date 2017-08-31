/**
 * Created by Seth on 8/23/2017.
 */
(function(){
    angular.module('app').controller('getStartedCtrl', function($scope, mainService){

        $scope.ctaShow = function () {
            TweenMax.to(document.getElementById('cta-pop-up'), 0.5, {
                ease: Power2.easeIn,
                display: 'inline'
            })
        };

        $scope.ctaHide = function(){
            TweenMax.to(document.getElementById('cta-pop-up'), 0.5, {
                ease: Power2.easeIn,
                display: 'none'
            })
        }

    })
})();