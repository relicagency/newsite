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

            $scope.changeRoute = function(route){

                let awards = document.getElementById('awards'),
                    press = document.getElementById('press'),
                    news = document.getElementById('news');

                if(route === "news"){
                    TweenMax.to(news, 0.25, {
                        display: "flex"
                    });
                    TweenMax.to(press, 0.25, {
                        display: "none"
                    });
                    TweenMax.to(awards, 0.25, {
                        display: "none"
                    });
                }
                if(route === "awards"){
                    TweenMax.to(press, 0.25, {
                        display: "none"
                    });
                    TweenMax.to(news, 0.25, {
                        display: "none"
                    });
                    TweenMax.to(awards, 0.25, {
                        display: "flex"
                    });
                }
                if(route === "press"){
                    TweenMax.to(awards, 0.25, {
                        display: "none"
                    });
                    TweenMax.to(news, 0.25, {
                        display: "none"
                    });
                    TweenMax.to(press, 0.25, {
                        display: "flex"
                    });
                }


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