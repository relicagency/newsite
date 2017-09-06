/**
 * Created by Seth on 8/23/2017.
 */
(function(){
    angular.module('app').controller('getStartedCtrl', function($scope, mainService){

        let mainPop = document.getElementById('cta-pop-up'),
            barFive = document.getElementById('get-started-animation-five'),
            barSix = document.getElementById('get-started-animation-six'),
            barSeven = document.getElementById('get-started-animation-seven');

        $scope.ctaShow = function () {
            let tl = new TimelineMax();
            tl.to(mainPop, 0.5, { ease: Power2.easeIn, left: 0 })
                .to(barFive, 0.15, {left: 0}, "+=0.5")
                .to(barSix, 0.15, {right: 0})
                .to(barSeven, 0.15, {left: 0})
                .to(barSix, 0.15, {left: "101%"}, "-=0.15");
        };

        $scope.ctaHide = function(){
            let tl = new TimelineMax();
            tl.to(barSeven, 0.15, {left: "101%"})
                .to(barSix, 0.15, {left: 0}, "-=0.15")
                .to(barFive, 0.15, {left: "101%"})
                .to(barSix, 0.15, {left: '-100%'}, "-=0.15")
                .to(mainPop, 0.5, { ease: Power2.easeIn, left: "-101%" })
            };

    })
})();