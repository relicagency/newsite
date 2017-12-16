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

            $scope.changeRoute = function(route) {

                let awards = document.getElementById('awards'),
                    press = document.getElementById('press'),
                    news = document.getElementById('news'),
                    routerAwards = document.getElementById('router-awards'),
                    routerPress = document.getElementById('router-press'),
                    routerNews = document.getElementById('router-news'),
                    blueTriangleAwards = document.getElementById('blue-triangle-awards'),
                    blueTrianglePress = document.getElementById('blue-triangle-press'),
                    blueTriangleNews = document.getElementById('blue-triangle-news');

                if (route === "news") {
                    TweenMax.to(news, 0.25, {
                        display: "flex"
                    });
                    TweenMax.to(routerNews, 0.25, {
                        backgroundColor: "rgba(255,255,255,0.8)",
                        color: "#161616"
                    });
                    TweenMax.to(blueTriangleNews, 0.05, {
                        display: "flex"
                    });
                    TweenMax.to(press, 0.05, {
                        display: "none"
                    });
                    TweenMax.to(routerPress, 0.05, {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        color: "white"
                    });
                    TweenMax.to(blueTrianglePress, 0.05, {
                        display: "none"
                    });
                    TweenMax.to(awards, 0.05, {
                        display: "none"
                    });
                    TweenMax.to(routerAwards, 0.05, {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        color: "white"
                    });
                    TweenMax.to(blueTriangleAwards, 0.05, {
                        display: "none"
                    });
                }
                if (route === "awards") {
                    TweenMax.to(news, 0.05, {
                        display: "none"
                    });
                    TweenMax.to(routerNews, 0.05, {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        color: "white"
                    });
                    TweenMax.to(blueTriangleNews, 0.05, {
                        display: "none"
                    });
                    TweenMax.to(press, 0.05, {
                        display: "none"
                    });
                    TweenMax.to(routerPress, 0.05, {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        color: "white"
                    });
                    TweenMax.to(blueTrianglePress, 0.05, {
                        display: "none"
                    });
                    TweenMax.to(awards, 0.25, {
                        display: "flex"
                    });
                    TweenMax.to(routerAwards, 0.25, {
                        backgroundColor: "rgba(255,255,255,0.8)",
                        color: "#161616"
                    });
                    TweenMax.to(blueTriangleAwards, 0.05, {
                        display: "inline"
                    });
                }
                if (route === "press") {
                    TweenMax.to(news, 0.05, {
                        display: "none"
                    });
                    TweenMax.to(routerNews, 0.05, {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        color: "white"
                    });
                    TweenMax.to(blueTriangleNews, 0.05, {
                        display: "none"
                    });
                    TweenMax.to(press, 0.25, {
                        display: "flex"
                    });
                    TweenMax.to(routerPress, 0.25, {
                        backgroundColor: "rgba(255,255,255,0.8)",
                        color: "#161616"
                    });
                    TweenMax.to(blueTrianglePress, 0.05, {
                        display: "inline"
                    });
                    TweenMax.to(awards, 0.05, {
                        display: "none"
                    });
                    TweenMax.to(routerAwards, 0.05, {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        color: "white"
                    });
                    TweenMax.to(blueTriangleAwards, 0.05, {
                        display: "none"
                    });

                }
            }

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