/**
 * Created by Seth on 8/23/2017.
 */
(function(){
    angular.module('app').controller('getStartedCtrl', function($scope, mainService){

        let mainPop = document.getElementById('cta-pop-up'),
            barOne = document.getElementById('get-started-animation-one'),
            barTwo = document.getElementById('get-started-animation-two'),
            barThree = document.getElementById('get-started-animation-three'),
            barFour = document.getElementById('get-started-animation-four'),
            barFive = document.getElementById('get-started-animation-five'),
            barSix = document.getElementById('get-started-animation-six'),
            barSeven = document.getElementById('get-started-animation-seven');

        $scope.ctaShow = function () {
            let tl = new TimelineMax();
            tl.to(mainPop, 0.5, { ease: Power2.easeIn, left: 0 })
                .to(barOne, 0.1, {width: "100%"}, "+=0.15")
                .to(barTwo, 0.1, {height: "100%"})
                .to(barThree, 0.1, {width: "100%"})
                .to(barFour, 0.1, {height: "100%"})
                .to(barFive, 0.2, {left: 0})
                .to(barSix, 0.2, {right: 0})
                .to(barSeven, 0.2, {left: 0})
                .to(barSix, 0, {left: "101%"}, "-=0.2")
                .to(barFour, 0.1, {height: 0})
                .to(barThree, 0.1, {width: 0})
                .to(barTwo, 0.1, {height: 0})
                .to(barOne, 0.1, {width: 0});
        };

        $scope.ctaHide = function(){
            // let tl = new TimelineMax();
            // tl.to(hamburgerTwo, 0.08, {top: "47%"})
            //     .to(hamburgerOne, 0.08, {top: "47%"})
            //     .to(hamburgerThree, 0.08, {top: "47%"})

            TweenMax.to(document.getElementById('cta-pop-up'), 0.5, {
                ease: Power2.easeOut,
                left: '-101%'
            })
        }

    })
})();