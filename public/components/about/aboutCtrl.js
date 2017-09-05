/**
 * Created by Seth on 8/16/2017.
 */
(function(){
    angular.module('app').controller('aboutCtrl', function($scope, mainService){
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

        $scope.expandLeader = function(peep){

            if(peep !== 'jessica'){
                TweenMax.to(document.getElementById('leader-' + peep), 0.5, {
                    height: "750px",
                    color: "white",
                    ease: Power3.easeIn
                });
                expand = true;
            } else {
                TweenMax.to(document.getElementById('leader-' + peep), 0.5, {
                    height: "915px",
                    color: "white",
                    ease: Power3.easeIn
                });
                expand = true;
            }


            if( lastLeader !== "" && document.getElementById('leader-' + lastLeader).style.height !== "175px")  {

                TweenMax.to(document.getElementById('leader-' + lastLeader), 0.5, {
                    ease: Power3.easeOut,
                    height: "175px",
                    color: 'black'
                });

                expand = false;

            }

            if(lastLeader !== peep){
                expand = true;
            }

            if(expand) {

                TweenMax.to(document.getElementById('about-main-container'), 0.5, {
                    height: "295vh"
                });

            } else if(!expand){
                TweenMax.to(document.getElementById('about-main-container'), 0.5, {
                    height: "216vh"
                });
            }


            lastLeader = peep;

        }

    });
})();