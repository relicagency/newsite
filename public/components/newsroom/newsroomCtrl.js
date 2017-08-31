/**
 * Created by Seth on 8/23/2017.
 */
(function(){
    angular.module('app')
        .controller('newsroomCtrl', function($scope, mainService){

            let backgroundPic = document.getElementById('newsroom-background');

            window.onscroll = function() {
                let offSet = window.pageYOffset,
                    csParaStart = offSet * 0.75;

                mainService.navBackground(offSet);
                mainService.parallaxIt(backgroundPic,csParaStart);
            };

            let lastRoute = "";

            $scope.newsroomRouteShow = function(num){
                TweenMax.to(document.getElementById('newsroom-route-' + num), 0.5, {
                    ease: Power2.easeIn,
                    opacity: 1
                });

                if(lastRoute !== "" && lastRoute !== num){
                    TweenMax.to(document.getElementById('newsroom-route-' + lastRoute), 0.5,  {
                        ease: Power2.easeOut,
                        opacity: 0
                    })
                }

                lastRoute = num;

            }

        })
})();