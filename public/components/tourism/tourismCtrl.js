/**
 * Created by Seth on 8/17/2017.
 */
(function(){
    angular.module('app')
        .controller('tourismCtrl', function($scope, mainService){

            $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];


            let backgroundPic = document.getElementById('tourism-background');

            window.onscroll = function() {
                let offSet = window.pageYOffset,
                    csParaStart = offSet * 0.75;

                mainService.navBackground(offSet);
                mainService.parallaxIt(backgroundPic,csParaStart);
            };

            $scope.readMore = function () {

                TweenMax.to(document.getElementById('tourism-experts'), 0.25, {
                    height: "auto"
                });

                TweenMax.to(document.getElementById('tourism-read-more'), 0.25, {
                    height: 0,
                    ease: Power3.easeOut,
                    display: "none"
                });

            }

        })
})();