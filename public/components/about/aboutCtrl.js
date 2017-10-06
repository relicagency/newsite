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

        $scope.expandLeader = function(leader){

            if(window.innerWidth < 769) {

                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "100vh",
                    ease: Power3.easeIn,
                    overflow: "scroll"
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;


                if (lastLeader !== "" && document.getElementById('leader-' + lastLeader).style.height !== "210px") {

                    TweenMax.to(document.getElementById('leader-' + lastLeader), 0.5, {
                        ease: Power3.easeOut,
                        height: "210px",
                        overflow: "hidden",
                        scrollTop: 0
                    });
                    TweenMax.to(document.getElementById('leader-about-' + lastLeader), 0.15, {
                        opacity: 0
                    });

                    expand = false;

                }

                lastLeader = leader;

                return;

            }

            if(window.innerWidth < 425) {

                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "100vh",
                    ease: Power3.easeIn,
                    overflow: "scroll"
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;


                if (lastLeader !== "" && document.getElementById('leader-' + lastLeader).style.height !== "210px") {

                    TweenMax.to(document.getElementById('leader-' + lastLeader), 0.5, {
                        ease: Power3.easeOut,
                        height: "210px",
                        overflow: "hidden",
                        scrollTop: 0
                    });
                    TweenMax.to(document.getElementById('leader-about-' + lastLeader), 0.15, {
                        opacity: 0
                    });

                    expand = false;

                }

                lastLeader = leader;

                return;

            }



            if(lastLeader !== leader){
                    expand = true;
                }

                if(expand === true && window.innerWidth > 425) {

                    TweenMax.to(document.getElementById('about-main-container'), 0.5, {
                        height: "295vh"
                    });

                } else if(!expand){
                    TweenMax.to(document.getElementById('about-main-container'), 0.5, {
                        height: "216vh"
                    });
                }   if(expand === true && window.innerWidth < 425) {

                    TweenMax.to(document.getElementById('about-main-container'), 0.5, {
                        height: "450vh"
                    });

                } else if(!expand) {
                    TweenMax.to(document.getElementById('about-main-container'), 0.5, {
                        height: "400vh"
                    });
                }


            if(leader === 'adam'){
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "95vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                  opacity: 1
                });
                expand = true;
            }  if(leader === 'jordan'){
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "80vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            }  if(leader === 'colby'){
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "65vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            } if(leader === 'jessica' && window.innerWidth < 1025){
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "90vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            }if(leader === 'jessica' && window.innerWidth > 1024){
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "90vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            } if(leader === 'hannah' && window.innerWidth < 1025){
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "75vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            }if(leader === 'hannah' && window.innerWidth > 1024){
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "75vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            }


            if( lastLeader !== "" && document.getElementById('leader-' + lastLeader).style.height !== "210px" )  {

                TweenMax.to(document.getElementById('leader-' + lastLeader), 0.5, {
                    ease: Power3.easeOut,
                    height: "210px"
                });
                TweenMax.to(document.getElementById('leader-about-' + lastLeader), 0.15, {
                    opacity: 0
                });

                expand = false;

            }

            if(lastLeader !== leader){
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


            lastLeader = leader;

        }

    });
})();