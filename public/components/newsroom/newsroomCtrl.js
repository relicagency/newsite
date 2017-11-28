(function(){
    angular.module('app')
        .controller('newsroomCtrl', function($scope, mainService){

            $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

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

            };

            $scope.pressShow = function(num){

                let pressRelease = document.getElementById('press-release-' + num),
                    mainCont = document.getElementById('newsroom-main-container');

                TweenMax.to(pressRelease, 0.25, {
                    right: 0
                });
                TweenMax.to(mainCont, 0.25, {
                    position: "absolute",
                    height: "0vh",
                    overflow: "hidden"
                });

            };
            $scope.pressHide = function(num){

                let pressRelease = document.getElementById('press-release-' + num),
                    mainCont = document.getElementById('newsroom-main-container');

                TweenMax.to(pressRelease, 0.25, {
                    right: "105%"
                });
                TweenMax.to(mainCont, 0.25, {
                    position: "relative",
                    height: "auto",
                    overflow: "visible"
                });

            };

        })
})();