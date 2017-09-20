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
                intro: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas.",
                sections: [
                    {number: "one", title: "Creative Strategy"},
                    {number: "two", title: "Campaign Development"},
                    {number: "three", title: "Branding"},
                    {number: "four", title: "Graphic Design"},
                    {number: "five", title: "TV/Radio Production"},
                    {number: "six", title: "Digital Media"},
                    {number: "seven", title: "Web Design/Development"}
                ]
            },
            {
                title: 'creative',
                intro: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas.",
                sections: [
                    {},
                    {},
                    {},
                    {}
                ]
            },
            {
                title: 'demand gen',
                intro: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas.",
                sections: [
                    {},
                    {},
                    {},
                    {}
                ]
            },
            {
                title: 'digital',
                intro: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas.",
                sections: [
                    {},
                    {},
                    {},
                    {}
                ]
            },
            {
                title: 'pr & content',
                intro: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas.",
                sections: [
                    {},
                    {},
                    {},
                    {}
                ]
            }
        ];


        $scope.lastNum = "";

        $scope.servicesMobile = function(num, top){
            let mobileExpand = document.getElementById('services-mobile-expand-' + num),
                mobileExpandLast = document.getElementById('services-mobile-expand-' + $scope.lastNum),
                contentMobile = document.getElementById('content-mobile-content-' + num),
                arrow = document.getElementById('mobile-expand-arrow-' + num),
                lastArrow = document.getElementById('mobile-expand-arrow-' + $scope.lastNum),
                lastContentMobile = document.getElementById('content-mobile-content-' + $scope.lastNum),
                mainContainer = document.getElementById('services-main-container'),
                servicesMobile = document.getElementById('services-mobile');


            if( mobileExpand.style.height === "200vh" && num === $scope.lastNum ){

                TweenMax.to(mobileExpand, 0, {
                    color: "transparent"
                });
                TweenMax.to(mobileExpand, 0.5, {
                    display: "none",
                    height: 0
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
            }  if($scope.lastNum !== "" && num !== $scope.lastNum){

                console.log(mobileExpandLast.style.height);

                TweenMax.to(lastArrow, 0.75, {
                    transform: "rotateX(0deg)"
                });
                TweenMax.to(lastContentMobile, 0.1, {
                    marginBottom: "5vw"
                });
                TweenMax.to(mobileExpandLast, 0, {
                   color: "transparent"
                });
                TweenMax.to(mobileExpandLast, 0.1, {
                    display: "none",
                    height: 0
                });
                TweenMax.to(contentMobile, 0.25, {
                    marginBottom: "200vh"
                });
                TweenMax.to(mobileExpand, 0.5, {
                    display: "flex",
                    height: "200vh",
                    color: "#bd9a35"
                });
                TweenMax.to(arrow, 0.75, {
                    transform: "rotateX(180deg)"
                });

                $scope.lastNum = num;

                return;

            }

            TweenMax.to( mainContainer, 0.5, {
                height: "520vh"
            });
            TweenMax.to(servicesMobile, 0.5, {
                height: "480vh"
            });
            TweenMax.to(contentMobile, 0.5, {
                marginBottom: "200vh"
            });
            TweenMax.to(mobileExpand, 0.5, {
                display: "flex",
                height: "200vh",
                color: "#bd9a35"
            });
            TweenMax.to(arrow, 0.75, {
                transform: "rotateX(180deg)"
                });

            $scope.lastNum = num;

        }



    });
})();