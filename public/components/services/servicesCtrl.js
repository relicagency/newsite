/**
 * Created by Seth on 8/11/2017.
 */
(function(){
    angular.module('app').controller('servicesCtrl', function($scope, $location, $anchorScroll, mainService){

        $scope.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        };


        let lastAccordion = "";
        let lastTopSec = -1;
        let backgroundPic = document.getElementById('services-background');
        $scope.content = 0;

        window.onscroll = function() {
            let offSet = window.pageYOffset,
                csParaStart = offSet * 0.75;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic,csParaStart);
        };

            $scope.changeContent = function(num){
          $scope.content = num;

          TweenMax.to(document.getElementById('top-sec-' + num), 0.10,  {
              backgroundColor: "#BD9A35"
          });

            if(lastTopSec > -1 && lastTopSec !== num) {
                TweenMax.to(document.getElementById('top-sec-' + lastTopSec), 0.10, {
                    backgroundColor: "transparent"
                });
            }

            lastTopSec = num;
        };

        $scope.accordionPop = function(num) {


            TweenMax.to(document.getElementById('accordion-pop-' + num), 0.5, {
                ease: Power3.easeIn,
                height: "460px"
            });
            TweenMax.to(document.getElementById('plus-sign-' + num), 0.5, {
                transform: "rotate(315deg)",
                height: "65px",
                width: "50px"
            });


            if( lastAccordion !== "" && document.getElementById('accordion-pop-' + lastAccordion).style.height !== "0px" )  {

                TweenMax.to(document.getElementById('accordion-pop-' + lastAccordion), 0.5, {
                    ease: Power3.easeOut,
                    height: 0
                });
                TweenMax.to(document.getElementById('plus-sign-' + lastAccordion), 0.5, {
                    transform: "rotate(0deg)",
                    height: "55px",
                    width: "40px"
                });
            }


            lastAccordion = num;

        };

        $scope.content = 0;

        $scope.services = [
            {
                title: 'traditional',
                info: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas."
            },
            {
                title: 'creative',
                info: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas."
            },
            {
                title: 'demand gen',
                info: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas."
            },
            {
                title: 'digital',
                info: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas."
            },
            {
                title: 'pr & content',
                info: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas."
            }
        ];


        $scope.lastNum = "";

        $scope.servicesMobile = function(num, top){
            let mobileExpand = document.getElementById('services-mobile-expand'),
                contentMobile = document.getElementById('content-mobile-content-' + num),
                arrow = document.getElementById('mobile-expand-arrow-' + num),
                lastArrow = document.getElementById('mobile-expand-arrow-' + $scope.lastNum),
                lastContentMobile = document.getElementById('content-mobile-content-' + $scope.lastNum),
                mainContainer = document.getElementById('services-main-container'),
                servicesMobile = document.getElementById('services-mobile');

            if( mobileExpand.style.height === "200vh" && num === $scope.lastNum ){
                TweenMax.to(mobileExpand, 0.5, {
                    position: "absolute",
                    top: top + "vw",
                    height: 0,
                    width: "95%",
                    backgroundColor: "rgba(255,255,255,1)",
                    zIndex: "100",
                });
                TweenMax.to(arrow, 0.75, {
                    transform: "rotateX(0deg)"
                });
                TweenMax.to( mainContainer, 0.75, {
                    height: "320vh"
                });
                TweenMax.to(servicesMobile, 0.75, {
                    height: "280vh"
                });
                TweenMax.to(contentMobile, 0.75, {
                    marginBottom: "5vw"
                });

                return;
            }  if(mobileExpand.style.height === "200vh" && num !== $scope.lastNum){

                TweenMax.to(lastArrow, 0.75, {
                    transform: "rotateX(0deg)"
                });
                TweenMax.to(lastContentMobile, 0.1, {
                    marginBottom: "5vw"
                });
                TweenMax.to(contentMobile, 0.25, {
                    marginBottom: "200vh"
                });
                TweenMax.to(mobileExpand, 0.5, {
                    position: "absolute",
                    top: top + "vw",
                    height: "200vh",
                    width: "95%",
                    backgroundColor: "rgba(255,255,255,1)",
                    zIndex: "100",
                });
                TweenMax.to(arrow, 0.75, {
                    transform: "rotateX(180deg)"
                });

                $scope.lastNum = num;

                return;

            }

            TweenMax.to( mainContainer, 0.1, {
                height: "520vh"
            });
            TweenMax.to(servicesMobile, 0.1, {
                height: "480vh"
            });
            TweenMax.to(contentMobile, 0.1, {
                marginBottom: "200vh"
            });
            TweenMax.to(mobileExpand, 0.5, {
                position: "absolute",
                top: top + "vw",
                height: "200vh",
                width: "95%",
                backgroundColor: "rgba(255,255,255,1)",
                zIndex: "100",
            });
            TweenMax.to(arrow, 0.75, {
                transform: "rotateX(180deg)"
                });

            $scope.lastNum = num;

        }



    });
})();