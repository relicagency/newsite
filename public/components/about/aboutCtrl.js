/**
 * Created by Seth on 8/16/2017.
 */
(function(){
    angular.module('app').controller('aboutCtrl', function($scope, mainService){

        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

        $scope.aboutRouterTitle = "Leadership";

        let lastLeader = '',
            expand = true,
            backgroundPic = document.getElementById('about-background');

        window.onscroll = function() {
            let offSet = window.pageYOffset,
                csParaStart = offSet * 0.5050505050505050;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic,csParaStart);
        };

        $scope.changeAboutRoute = function(route){

                if (route === 'story') {

                    TweenMax.to(document.getElementById('about-leadership'), 0.35, {
                        backgroundColor: "rgba(0,0,0,1)"
                    });
                    TweenMax.to(document.getElementById('about-story'), 0.35, {
                        backgroundColor: "rgba(255,255,255,1)"
                    });

                    TweenMax.to(document.getElementById('about-route-story'), 0.25, {
                        ease: Power2.easeIn,
                        display: "inline"
                    });
                    TweenMax.to(document.getElementById('about-route-leadership'), 0.25, {
                        ease: Power2.easeOut,
                        display: "none"
                    });
                }


            if(route === 'leadership'){

                TweenMax.to(document.getElementById('about-leadership'), 0.35, {
                    backgroundColor: "rgba(255,255,255,1)"

                });
                TweenMax.to(document.getElementById('about-story'), 0.35, {
                    backgroundColor: "rgba(0,0,0,1)"
                });

                TweenMax.to(document.getElementById('about-route-leadership'), 0.25, {
                    ease: Power2.easeIn,
                    display: "inline"
                });
                TweenMax.to(document.getElementById('about-route-story'), 0.25, {
                    ease: Power2.easeOut,
                    display: "none"
                });
            }

        };

        let shrinkTheLeader = "";

        $scope.expandLeader = function(leader){

            let leaderDiv = document.getElementById('leader-' + leader),
                leaderAbout = document.getElementById('leader-about-' + leader),
                shrinkLeader = document.getElementById('leader-' + shrinkTheLeader),
                shrinkLeaderAbout = document.getElementById('leader-about-' + shrinkTheLeader);

            if(leaderDiv.style.height === "auto"){
                TweenMax.to(leaderDiv, 0.25  , {
                    ease: Power2.easeIn,
                    height: '200px'
                });
                TweenMax.to(leaderAbout, 0.10, {
                    opacity: 0,
                    ease: Power2.easeIn
                });

                return 0;

            } if(shrinkTheLeader !== leader && shrinkTheLeader !== ""){
                TweenMax.to(shrinkLeader, 0.25  , {
                    ease: Power2.easeIn,
                    height: '200px'
                });
                TweenMax.to(shrinkLeaderAbout, 0.10, {
                    opacity: 0,
                    ease: Power2.easeIn
                });
            }

            TweenMax.to(leaderDiv, 0.5  , {
                ease: Power2.easeIn,
                height: 'auto'
            });
            TweenMax.to(leaderAbout, 0.10, {
                opacity: 1,
                ease: Power2.easeIn
            });

        shrinkTheLeader = leader;

        }

    });
})();