'use strict';

(function () {
  angular.module('app', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', config]).run(['$rootScope', '$window', scrollFix]);

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/home',
      controller: 'homeCtrl',
      templateUrl: './components/home/home.html'
    }).state('expertise', {
      url: '/expertise',
      controller: 'expertiseCtrl',
      templateUrl: './components/expertise/expertise.html'
    }).state('services', {
      url: '/services',
      controller: 'servicesCtrl',
      templateUrl: './components/services/services.html'
    }).state('contact', {
      url: '/contact',
      controller: 'contactCtrl',
      templateUrl: './components/contact/contact.html'
    }).state('about', {
      url: '/about',
      controller: 'aboutCtrl',
      templateUrl: './components/about/about.html'
    }).state('tourism', {
      url: '/expertise/tourism',
      controller: 'tourismCtrl',
      templateUrl: './components/tourism/tourism.html'
    }).state('telecom', {
      url: '/expertise/telecom',
      controller: 'telecomCtrl',
      templateUrl: './components/telecom/telecom.html'
    }).state('tech', {
      url: '/expertise/tech',
      controller: 'techCtrl',
      templateUrl: './components/tech/tech.html'
    }).state('demandgen', {
      url: '/expertise/demandgen',
      controller: 'demandgenCtrl',
      templateUrl: './components/demandgen/demandgen.html'
    }).state('newsroom', {
      url: '/newsroom',
      controller: 'newsroomCtrl',
      templateUrl: './components/newsroom/newsroom.html'
    }).state('work', {
      url: '/work',
      controller: 'workCtrl',
      templateUrl: './components/work/work.html'
    }).state('our-work', {
      url: '/work/:client',
      controller: 'ourWorkCtrl',
      templateUrl: './components/work/ourWork.html'
    });

    $urlRouterProvider.otherwise('/home');
  }

  function scrollFix($rootScope, $window) {
    $rootScope.$on('$stateChangeSuccess', function () {
      $window.scrollTo(0, 0);
    });
  }
})();
'use strict';

(function () {

  angular.module('app').controller('mainCtrl', function ($scope) {
    $scope.example = "this is an example";
  });
})();
'use strict';

/**
 * Created by Seth on 8/11/2017.
 */
(function () {
    angular.module('app').service('mainService', function ($http) {

        var nav = document.getElementById('nav');

        this.navBackground = function (offset) {

            if (offset > 100) {
                TweenMax.to(nav, 2, {
                    backgroundColor: "rgba(0,0,0,0.9)"
                });
            }if (offset < 95) {
                TweenMax.to(nav, 2, { backgroundColor: "rgba(0,0,0,0)" });
            }
        };

        this.parallaxIt = function (pic, picLax) {
            TweenMax.to(pic, 0, {
                top: picLax + "px"
            });
        };

        this.contactRelic = function (contact) {
            return $http({
                method: 'POST',
                url: '/relic/contact',
                data: {
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    jobTitle: contact.jobTitle,
                    business: contact.business,
                    email: contact.email,
                    phone: contact.phone,
                    message: contact.message,
                    captcha: contact.captcha
                }
            }).then(function (response) {
                return response;
            });
        };

        this.clients = {
            tds: {
                title: "TDS",
                intro: "Our team started working with a company called Baja Broadband in 2012. They even named us as one of the top 5 reasons for their success. We worked on media, creative and digital services and became so ingrained and knowledgable about their company that we were asked to stay on when TDS Telecom bought the company in 2014. Relic was an instrumental part of the TDS rebrand in 2015.",
                stats: "../../images/work-assets/tds-case.png",
                video: true,
                logoPath: "../../images/tds-logo.svg",
                webDesign: "../../images/work-assets/tds-site.png",
                digitalAdds: "../../images/work-assets/tds-digital.png",
                brochures: "../../images/work-assets/tds-brochure.png",
                billboards: "../../images/work-assets/tds-billboard.png",
                directMail: "../../images/work-assets/work-tds1.png",
                branding: "",
                posters: "",
                postcards: "",
                newspaper: "",
                illustrations: "",
                stationary: "",
                height: "623vh"
            },
            bryce: {
                title: "Garfield County Tourism",
                intro: "Garfield County Tourism hired us to help make their brand message consistent. We replaced a lot of print with digital creatives that they had never used before. In 2014, they challenged us to create a campaign to help visitors stay longer in Garfield County. In response, we launched the Take Your Time campaign. Through this effort, the TRT increased by 15.8 percent in 2015 from 2014 and by 8 percent in 2016 from 2015.",
                stats: "../../images/work-assets/GarfieldStat.png",
                video: false,
                logoPath: "",
                webDesign: "../../images/work-assets/garfield-site.png",
                digitalAdds: "../../images/work-assets/garfield-banner.png",
                brochures: "../../images/work-assets/garfield-brochure.png",
                billboards: "",
                directMail: "",
                branding: "../../images/work-assets/garfield-big.png",
                posters: "../../images/work-assets/garfield-poster.png",
                postcards: "",
                newspaper: "",
                illustrations: "",
                stationary: "",
                height: "542vh"
            },
            tuac: {
                title: "Tuacahn",
                intro: "Tuacahn Amphitheatre hired us in 2013 for a small creative refresh. A couple months after that, they came back for a little more. We started doing their TV and radio buys later that year while acting as a consultant for other buys. The following year, in 2014, we took over their entire marketing budget. We now provide showstopping creative, digital, media and social media services for the popular venue.",
                stats: "../../images/work-assets/tuac-stats.png",
                video: false,
                logoPath: "",
                webDesign: "../../images/work-assets/tuac-site.png",
                digitalAdds: "../../images/work-assets/tuac-banners.png",
                brochures: "",
                billboards: "../../images/work-assets/tuac-billboard.png",
                directMail: "",
                branding: "",
                posters: "../../images/work-assets/tuac-posters.png",
                postcards: "",
                newspaper: "",
                illustrations: "",
                stationary: "",
                height: "468vh"
            },
            uintah: {
                title: "Uintah County Tourism",
                intro: "Uintah County Tourism hired us in 2015 to help make their brand message consistent. In 2016, we determined the correct target audience and created a message that spoke to parents with young children. Thus the Origin of Adventure campaign was born, featuring the well-beloved dinosaurs, Vern and Al. Even after an economical crisis in Vernal, visitation numbers in Uintah County increased by 11.4 percent during May, their busiest month.",
                stats: "../../images/work-assets/uintah-stat.png",
                video: false,
                logoPath: "",
                webDesign: "../../images/work-assets/uintah-site.png",
                digitalAdds: "",
                brochures: "../../images/work-assets/uintah-book.png",
                billboards: "",
                directMail: "",
                branding: "",
                posters: "../../images/work-assets/uintah-poster.png",
                postcards: "../../images/work-assets/uintah-postcard.png",
                newspaper: "",
                illustrations: "",
                stationary: "",
                height: "468vh"
            },
            uvhb: {
                title: "Utah Valley Home Builders",
                intro: "UVHBA hired us to help advertise their annual Parade of Homes in 2012. The Parade is their biggest revenue builder and attracted about 8,000 visitors. After a couple of years going strictly by the book, we convinced UVHBA to take a leap of faith in 2014 and truncate their budget into only 30 days. That year, ticket sales increased by 32 percent. In 2016, over 25,000 people came to the parade.",
                stats: "../../images/work-assets/uvhb-stats.png",
                video: false,
                logoPath: "",
                webDesign: "",
                digitalAdds: "../../images/work-assets/uvhba-digital.png",
                brochures: "",
                billboards: "../../images/work-assets/uvhba-billboard.png",
                directMail: "",
                branding: "../../images/work-assets/uvhba-branding.png",
                posters: "../../images/work-assets/uvhba-golf.png",
                postcards: "",
                newspaper: "",
                illustrations: "",
                stationary: "",
                height: "468vh"
            },
            maxx: {
                title: "MaxxSouth",
                intro: "",
                stats: "",
                video: false,
                logoPath: "",
                webDesign: "../../images/work-assets/maxx-site.png",
                digitalAdds: "",
                brochures: "",
                billboards: "../../images/work-assets/maxx-billboard.png",
                directMail: "../../images/work-assets/maxx-bigfoot.png",
                branding: "",
                posters: "",
                postcards: "",
                newspaper: [{ path: "../../images/work-assets/maxx-football.png" }, { path: "../../images/work-assets/maxx-posters.png" }],
                illustrations: "",
                stationary: "",
                height: "371vh"
            },
            moab: {
                title: "Moab",
                intro: "",
                stats: "",
                video: false,
                logoPath: "",
                webDesign: "",
                digitalAdds: "",
                brochures: "",
                billboards: "",
                directMail: "",
                branding: "",
                posters: "",
                postcards: "",
                newspaper: "",
                illustrations: "",
                stationary: "",
                height: "130vh"
            },
            zerorez: {
                title: "Zerorez",
                intro: "",
                stats: "",
                video: false,
                logoPath: "",
                webDesign: "",
                digitalAdds: "../../images/work-assets/zerorez-one.png",
                brochures: "",
                billboards: "",
                directMail: "",
                branding: "",
                posters: "",
                postcards: "",
                newspaper: "",
                illustrations: "",
                stationary: "",
                height: "130vh"
            },
            wfront: {
                title: "WorkFront",
                intro: "",
                stats: "",
                video: false,
                logoPath: "",
                webDesign: "",
                digitalAdds: "",
                brochures: "",
                billboards: "",
                directMail: "",
                branding: "",
                posters: "",
                postcards: "",
                newspaper: "",
                illustrations: [{ path: "../../images/work-assets/wfront-one.png" }, { path: "../../images/work-assets/wfront-two.png" }],
                stationary: "",
                height: "130vh"
            },
            us: {
                title: "Utah Shakespeare Festival",
                intro: "",
                stats: "",
                video: false,
                logoPath: "",
                webDesign: "",
                digitalAdds: "",
                brochures: "",
                billboards: "",
                directMail: "",
                branding: "",
                posters: "",
                postcards: "",
                newspaper: [{ path: "../../images/work-assets/us-knights.png" }, { path: "../../images/work-assets/us-boeing.png" }, { path: "../../images/work-assets/us-love.png" }, { path: "../../images/work-assets/us-mercy.png" }],
                illustrations: "",
                stationary: "",
                height: "130vh"
            },
            brio: {
                title: "Brio",
                intro: "",
                stats: "",
                video: false,
                logoPath: "",
                webDesign: "../../images/work-assets/brio-site.png",
                digitalAdds: "../../images/work-assets/work-brio6.png",
                brochures: "../../images/work-assets/brio-brochure.png",
                billboards: "",
                directMail: "",
                branding: "../../images/work-assets/brio-branding.png",
                posters: "",
                postcards: "",
                newspaper: "",
                illustrations: "",
                stationary: "",
                height: "370vh"
            },
            ccbh: {
                title: "Cedar City  |  Brian Head",
                intro: "",
                stats: "",
                video: false,
                logoPath: "",
                webDesign: "",
                digitalAdds: [{ path: "../../images/work-assets/work-ccbh1.png" }, { path: "../../images/work-assets/work-ccbh2.png" }],
                brochures: "",
                billboards: "",
                directMail: "",
                branding: "",
                posters: "",
                postcards: "",
                newspaper: "",
                illustrations: "",
                stationary: "",
                height: "210vh"
            },
            beehive: {
                title: "Beehive Broadband",
                intro: "",
                stats: "",
                video: false,
                logoPath: "",
                webDesign: [{ path: "../../images/work-assets/work-bee2.png" }, { path: "../../images/work-assets/work-bee3.png" }, { path: "../../images/work-assets/work-bee4.png" }, { path: "../../images/work-assets/work-bee5.png" }],
                digitalAdds: "",
                brochures: "",
                billboards: "",
                directMail: "",
                branding: "",
                posters: "",
                postcards: "",
                newspaper: [{ path: "../../images/work-assets/work-bee1.png" }],
                illustrations: "",
                stationary: "",
                height: "430vh"
            },
            rubys: {
                title: "Ruby's Inn",
                intro: "",
                stats: "",
                video: false,
                logoPath: "",
                webDesign: "",
                digitalAdds: "",
                brochures: "",
                billboards: "",
                directMail: "",
                branding: "",
                posters: "",
                postcards: "",
                newspaper: [{ path: "../../images/work-assets/work-rubys1.png" }, { path: "../../images/work-assets/work-rubys2.png" }, { path: "../../images/work-assets/work-rubys3.png" }],
                illustrations: "",
                stationary: "",
                height: "130vh"
            },
            creef: {
                title: "Wayne County Tourism",
                intro: "",
                stats: "",
                video: false,
                logoPath: "",
                webDesign: "",
                digitalAdds: "",
                brochures: "",
                billboards: "",
                directMail: "",
                branding: "../../images/work-assets/work-creef1.png",
                stationary: "../../images/work-assets/work-creef2.png",
                postcards: "",
                newspaper: "",
                illustrations: "",
                posters: "",
                height: "210vh"
            },
            b2scapes: {
                title: "B2 Landscapes",
                intro: "",
                stats: "",
                video: false,
                logoPath: "",
                webDesign: "",
                digitalAdds: "",
                brochures: "../../images/work-assets/b2-brochure.png",
                billboards: "",
                directMail: "",
                branding: "",
                posters: "../../images/work-assets/work-b2-1.png",
                postcards: "",
                newspaper: "",
                illustrations: "",
                stationary: "",
                height: "210vh"
            },
            branding: {
                title: "Branding",
                intro: "",
                stats: "",
                video: false,
                logoPath: "",
                webDesign: "",
                digitalAdds: "",
                brochures: "",
                billboards: "",
                directMail: "",
                branding: [{ path: "../../images/work-assets/work-branding1.png" }, { path: "../../images/work-assets/work-branding2.png" }, { path: "../../images/work-assets/work-branding3.png" }, { path: "../../images/work-assets/work-branding4.png" }, { path: "../../images/work-assets/work-branding5.png" }, { path: "../../images/work-assets/work-branding6.png" }, { path: "../../images/work-assets/work-branding7.png" }],
                posters: "",
                postcards: "",
                newspaper: "",
                illustrations: "",
                stationary: "",
                height: "600vh"
            }
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/16/2017.
 */
(function () {
    angular.module('app').controller('aboutCtrl', function ($scope, mainService) {
        $scope.aboutRouterTitle = "Leadership";

        var lastLeader = '',
            expand = true,
            backgroundPic = document.getElementById('about-background');

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.5050505050505050;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic, csParaStart);
        };

        $scope.changeAboutRoute = function (route) {

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

            if (route === 'leadership') {
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

        $scope.expandLeader = function (peep) {

            if (peep !== 'jessica') {
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

            if (lastLeader !== "" && document.getElementById('leader-' + lastLeader).style.height !== "175px") {

                TweenMax.to(document.getElementById('leader-' + lastLeader), 0.5, {
                    ease: Power3.easeOut,
                    height: "175px",
                    color: 'black'
                });

                expand = false;
            }

            if (lastLeader !== peep) {
                expand = true;
            }

            if (expand) {

                TweenMax.to(document.getElementById('about-main-container'), 0.5, {
                    height: "295vh"
                });
            } else if (!expand) {
                TweenMax.to(document.getElementById('about-main-container'), 0.5, {
                    height: "216vh"
                });
            }

            lastLeader = peep;
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/14/2017.
 */
(function () {
    angular.module('app').controller('contactCtrl', function ($scope, mainService) {

        var backgroundPic = document.getElementById('contact-background');

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.5050505050505050;

            // backgroundPic.style.bottom = csParaStart + "px";
            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic, csParaStart);
        };

        $scope.contactRelic = function (contact) {
            mainService.contactRelic(contact).then(function (response) {
                console.log(response);
            });
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/22/2017.
 */
(function () {
    angular.module('app').controller('demandgenCtrl', function ($scope, mainService) {

        var backgroundPic = document.getElementById('demandgen-background');

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.5050505050505050;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic, csParaStart);
        };
    });
})();
'use strict';

(function () {
  angular.module('app').controller('expertiseCtrl', function ($scope, mainService) {

    window.onscroll = function () {
      var offSet = window.pageYOffset;

      mainService.navBackground(offSet);
    };
  });
})();
'use strict';

(function () {
    angular.module('app').controller('homeCtrl', function ($scope, mainService) {

        var homeMainBack = document.getElementById('home-hero'),
            headlineContent = document.getElementById('headline-content'),
            backgroundGrad = document.getElementById('home-linear-grad');

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.75;

            console.log(homeMainBack.style.backgroundPositionY);

            mainService.navBackground(offSet);

            headlineContent.style.opacity = 1 - csParaStart * 0.0019;
            if (window.innerWidth > 850) {
                headlineContent.style.top = 50 + csParaStart * 0.075 + "%";
            }
            if (window.innerWidth > 850) {
                backgroundGrad.style.opacity = 0.5 - csParaStart * 0.004;
            }if (window.innerWidth < 851) {
                headlineContent.style.top = 35 + csParaStart * 0.25 + "%";
                backgroundGrad.style.opacity = 0.5 - csParaStart * 0.4;
            }

            // if(window.innerWidth > 1400) {
            //     homeMainBack.style.backgroundPositionY = -281 + csParaStart + 'px';
            // } if(window.innerWidth < 1400 && window.innerWidth > 1100){
            //     homeMainBack.style.backgroundPositionY = -124 + csParaStart + 'px';
            // }  if(window.innerWidth < 1100 && window.innerWidth > 850){
            //     homeMainBack.style.backgroundPositionY = -50 + csParaStart + 'px';
            // } if(window.innerWidth < 850){
            //
            // }
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/23/2017.
 */
(function () {
    angular.module('app').controller('newsroomCtrl', function ($scope, mainService) {

        var backgroundPic = document.getElementById('newsroom-background');

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.75;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic, csParaStart);
        };

        var lastRoute = "";

        $scope.newsroomRouteShow = function (num) {
            TweenMax.to(document.getElementById('newsroom-route-' + num), 0.5, {
                ease: Power2.easeIn,
                opacity: 1
            });

            if (lastRoute !== "" && lastRoute !== num) {
                TweenMax.to(document.getElementById('newsroom-route-' + lastRoute), 0.5, {
                    ease: Power2.easeOut,
                    opacity: 0
                });
            }

            lastRoute = num;
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/11/2017.
 */
(function () {
    angular.module('app').controller('servicesCtrl', function ($scope, $location, $anchorScroll, mainService) {

        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };

        var lastAccordion = "";
        var lastTopSec = -1;
        var backgroundPic = document.getElementById('services-background');
        $scope.content = 0;

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.75;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic, csParaStart);
        };

        $scope.changeContent = function (num) {
            $scope.content = num;

            TweenMax.to(document.getElementById('top-sec-' + num), 0.10, {
                backgroundColor: "#BD9A35"
            });

            if (lastTopSec > -1 && lastTopSec !== num) {
                TweenMax.to(document.getElementById('top-sec-' + lastTopSec), 0.10, {
                    backgroundColor: "transparent"
                });
            }

            lastTopSec = num;
        };

        $scope.accordionPop = function (num) {

            TweenMax.to(document.getElementById('accordion-pop-' + num), 0.5, {
                ease: Power3.easeIn,
                height: "460px"
            });
            TweenMax.to(document.getElementById('plus-sign-' + num), 0.5, {
                transform: "rotate(315deg)",
                height: "65px",
                width: "50px"
            });

            if (lastAccordion !== "" && document.getElementById('accordion-pop-' + lastAccordion).style.height !== "0px") {

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

        $scope.services = [{
            title: 'traditional',
            info: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas."
        }, {
            title: 'creative',
            info: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas."
        }, {
            title: 'demand gen',
            info: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas."
        }, {
            title: 'digital',
            info: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas."
        }, {
            title: 'pr & content',
            info: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas."
        }];

        $scope.lastNum = "";

        $scope.servicesMobile = function (num, top) {
            var mobileExpand = document.getElementById('services-mobile-expand'),
                contentMobile = document.getElementById('content-mobile-content-' + num),
                arrow = document.getElementById('mobile-expand-arrow-' + num),
                lastArrow = document.getElementById('mobile-expand-arrow-' + $scope.lastNum),
                lastContentMobile = document.getElementById('content-mobile-content-' + $scope.lastNum),
                mainContainer = document.getElementById('services-main-container'),
                servicesMobile = document.getElementById('services-mobile');

            if (mobileExpand.style.height === "200vh" && num === $scope.lastNum) {
                TweenMax.to(mobileExpand, 0.5, {
                    position: "absolute",
                    top: top + "vw",
                    height: 0,
                    width: "95%",
                    backgroundColor: "rgba(255,255,255,1)",
                    zIndex: "100"
                });
                TweenMax.to(arrow, 0.75, {
                    transform: "rotateX(0deg)"
                });
                TweenMax.to(mainContainer, 0.75, {
                    height: "320vh"
                });
                TweenMax.to(servicesMobile, 0.75, {
                    height: "280vh"
                });
                TweenMax.to(contentMobile, 0.75, {
                    marginBottom: "5vw"
                });

                return;
            }if (mobileExpand.style.height === "200vh" && num !== $scope.lastNum) {

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
                    zIndex: "100"
                });
                TweenMax.to(arrow, 0.75, {
                    transform: "rotateX(180deg)"
                });

                $scope.lastNum = num;

                return;
            }

            TweenMax.to(mainContainer, 0.1, {
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
                zIndex: "100"
            });
            TweenMax.to(arrow, 0.75, {
                transform: "rotateX(180deg)"
            });

            $scope.lastNum = num;
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/21/2017.
 */
(function () {
    angular.module('app').controller('techCtrl', function ($scope, mainService) {

        var backgroundPic = document.getElementById('tech-background');

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.75;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic, csParaStart);
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/21/2017.
 */
(function () {
    angular.module('app').controller('telecomCtrl', function ($scope, mainService) {

        var backgroundPic = document.getElementById('telecom-background');

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.75;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic, csParaStart);
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/17/2017.
 */
(function () {
    angular.module('app').controller('tourismCtrl', function ($scope, mainService) {

        var backgroundPic = document.getElementById('tourism-background');

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.75;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic, csParaStart);
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/21/2017.
 */
(function () {
    angular.module('app').controller('ourWorkCtrl', function ($scope, $stateParams, $state, mainService) {

        $scope.client = mainService.clients[$stateParams.client];

        if ($scope.client.intro === "") {
            TweenMax.to(document.getElementById('client-content-intro'), 0, {
                display: "none"
            });
        }
        if ($scope.client.stats === "") {
            TweenMax.to(document.getElementById('client-stats-container'), 0, {
                display: "none"
            });
        }
        if (!$scope.client.video) {
            TweenMax.to(document.getElementById('client-video-container'), 0, {
                display: "none"
            });
        }if ($scope.client.webDesign === "") {
            TweenMax.to(document.getElementById('client-webdesign-container'), 0, {
                display: "none"
            });
        }if ($scope.client.digitalAdds === "") {
            TweenMax.to(document.getElementById('client-digital-container'), 0, {
                display: "none"
            });
        }if ($scope.client.brochures === "") {
            TweenMax.to(document.getElementById('client-brochures-container'), 0, {
                display: "none"
            });
        }if ($scope.client.directMail === "") {
            TweenMax.to(document.getElementById('client-dmail-container'), 0, {
                display: "none"
            });
        }if ($scope.client.billboards === "") {
            TweenMax.to(document.getElementById('client-billboard-container'), 0, {
                display: "none"
            });
        }if ($scope.client.branding === "") {
            TweenMax.to(document.getElementById('client-branding-container'), 0, {
                display: "none"
            });
        }if ($scope.client.posters === "") {
            TweenMax.to(document.getElementById('client-posters-container'), 0, {
                display: "none"
            });
        }if ($scope.client.postcards === "") {
            TweenMax.to(document.getElementById('client-postcards-container'), 0, {
                display: "none"
            });
        }if ($scope.client.newspaper === "") {
            TweenMax.to(document.getElementById('client-newspaper-container'), 0, {
                display: "none"
            });
        }if ($scope.client.illustrations === "") {
            TweenMax.to(document.getElementById('client-illustration-container'), 0, {
                display: "none"
            });
        }if ($scope.client.stationary === "") {
            TweenMax.to(document.getElementById('client-stationary-container'), 0, {
                display: "none"
            });
        }if ($stateParams.client === "us") {
            TweenMax.to(document.getElementById('client-newspaper-container'), 0, {
                display: "none"
            });
            TweenMax.to(document.getElementById("us-newspaper-container"), 0, {
                display: "flex"
            });
        }if ($stateParams.client === "ccbh") {
            TweenMax.to(document.getElementById('client-digital-container'), 0, {
                display: "none"
            });
            TweenMax.to(document.getElementById("ccbh-digital-container"), 0, {
                display: "flex"
            });
        }if ($stateParams.client === "beehive") {

            TweenMax.to(document.getElementById('client-webdesign-container'), 0, {
                display: "none"
            });
            TweenMax.to(document.getElementById('beehive-webdesign-container'), 0, {
                display: "flex"
            });
        }if ($stateParams.client === "rubys") {
            TweenMax.to(document.getElementById('client-newspaper-container'), 0, {
                display: "none"
            });
            TweenMax.to(document.getElementById('rubys-newspaper-container'), 0, {
                display: "flex"
            });
        }if ($stateParams.client === "b2scapes") {
            TweenMax.to(document.getElementById('posters-title'), 0, {
                display: "none"
            });
        }if ($stateParams.client === "branding") {
            TweenMax.to(document.getElementById('client-branding-container'), 0, {
                display: "none"
            });
            TweenMax.to(document.getElementById('main-branding-container'), 0, {
                display: "flex"
            });
        }

        var backgroundPic = document.getElementById('tds-background');

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.75;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic, csParaStart);
        };

        //This adjusts the height of the main container based on the page
        TweenMax.to(document.getElementById('work-show-main-container'), 0, {
            height: $scope.client.height
        });
    });
})();
'use strict';

/**
 * Created by Seth on 8/21/2017.
 */
(function () {
            angular.module('app').controller('workCtrl', function ($scope, mainService) {

                        window.onscroll = function () {
                                    var offSet = window.pageYOffset;

                                    mainService.navBackground(offSet);
                        };

                        //This is the animations for the work sections
                        $scope.workEnter = function (num) {
                                    TweenMax.to(document.getElementById('work-content-image-' + num), 0.75, {
                                                filter: "blur(8px)",
                                                opacity: 0
                                    });
                        };

                        $scope.workLeave = function (num) {
                                    TweenMax.to(document.getElementById('work-content-image-' + num), 0.5, {
                                                opacity: 1,
                                                filter: "blur(0)"
                                    });
                        };
            });
})();
'use strict';

/**
 * Created by Seth on 8/9/2017.
 */
(function () {

    angular.module('app').directive('footerDir', function () {
        return {
            restrict: 'E',
            templateUrl: './directives/footer/footer.html',
            controller: 'footerCtrl'
        };
    });
})();
'use strict';

(function () {
    angular.module('app').controller('footerCtrl', function ($scope) {

        $scope.footerSocialHover = function (social) {
            TweenMax.to(document.getElementById('footer-social-' + social), 1, { fill: "white" });
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/23/2017.
 */
(function () {
    angular.module('app').directive('getStartedDir', function () {
        return {
            restrict: 'E',
            templateUrl: './directives/get-started/getStarted.html',
            controller: 'getStartedCtrl'
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/23/2017.
 */
(function () {
    angular.module('app').controller('getStartedCtrl', function ($scope, mainService) {

        var mainPop = document.getElementById('cta-pop-up'),
            barFive = document.getElementById('get-started-animation-five'),
            barSix = document.getElementById('get-started-animation-six'),
            barSeven = document.getElementById('get-started-animation-seven');

        $scope.ctaShow = function () {
            var tl = new TimelineMax();
            tl.to(mainPop, 0.5, { ease: Power2.easeIn, left: 0 }).to(barFive, 0.15, { left: 0 }, "+=0.5").to(barSix, 0.15, { right: 0 }).to(barSeven, 0.15, { left: 0 }).to(barSix, 0.15, { left: "101%" }, "-=0.15");
        };

        $scope.ctaHide = function () {
            var tl = new TimelineMax();
            tl.to(barSeven, 0.15, { left: "101%" }).to(barSix, 0.15, { left: 0 }, "-=0.15").to(barFive, 0.15, { left: "101%" }).to(barSix, 0.15, { left: '-100%' }, "-=0.15").to(mainPop, 0.5, { ease: Power2.easeIn, left: "-101%" });
        };
    });
})();
'use strict';

(function () {

    angular.module('app').directive('homeContentDir', function () {
        return {
            restrict: 'E',
            templateUrl: './directives/home-content/home-content.html',
            controller: 'homeContentCtrl'
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/9/2017.
 */
(function () {
    angular.module('app').controller('homeContentCtrl', function ($scope) {

        var previousContent = "main-content",
            previousTop = "",
            mainContent = document.getElementById('main-content'),
            services = document.getElementById('services'),
            work = document.getElementById('work'),
            articles = document.getElementById('articles'),
            swnContainer = document.getElementById('swn-container'),
            swnTopContainer = document.getElementById('swn-top-container'),
            swnBottomContainer = document.getElementById('swn-bottom-container');

        $scope.switchContent = function (switcher) {

            if (window.innerWidth < 600) {

                console.log('Yo!');

                TweenMax.to(swnContainer, 0.15, {
                    height: "260vh"
                });
                TweenMax.to(swnTopContainer, 0.15, {
                    height: "10%"
                });
            }

            TweenMax.to(document.getElementById("top-" + switcher), 0.5, { backgroundColor: "white", color: '#161616' });
            if (previousTop !== "" && previousTop !== "top-" + switcher) {
                TweenMax.to(document.getElementById(previousTop), 0.5, { backgroundColor: '#161616', color: "white" });
            }

            TweenMax.to(document.getElementById(previousContent), 0, { display: "none" });
            TweenMax.to(document.getElementById(switcher), 0, { display: 'flex' });

            previousContent = switcher;
            previousTop = "top-" + switcher;
        };

        $scope.switcher = function () {
            TweenMax.to(document.getElementById(previousContent), 0, { display: "none" });
            TweenMax.to(document.getElementById('main-content'), 0, { display: "flex" }, 0.5);
            TweenMax.to(document.getElementById(previousTop), 0.25, { backgroundColor: '#161616', color: "white" });

            previousContent = 'main-content';
            previousTop = "";

            if (window.innerWidth < 600) {

                console.log('Yo mama....');

                TweenMax.to(swnContainer, 0.15, {
                    height: "30vh"
                });
                TweenMax.to(swnTopContainer, 0.15, {
                    height: "80%"
                });
            }
        };

        $scope.swnContentHover = function (num) {

            // if(num === "four"){
            //     TweenMax.to(document.getElementById('services-content-' + num), 0.5, {ease: Power2.easeOut, height: "200px", width: "200px"}, 0.25)
            // } else { TweenMax.to(document.getElementById('services-content-' + num), 0.5, {ease: Power2.easeOut, height: "250px", width: "250px"}, 0.25) }

        };

        $scope.swnContentHoverLeave = function (num) {
            // if(num === "four"){
            //     TweenMax.to(document.getElementById('services-content-' + num), 0.25, {ease: Power2.easeOut, height: "175px", width: "175px"})
            // } else { TweenMax.to(document.getElementById('services-content-' + num), 0.25, {ease: Power2.easeOut, height: "225px", width: "225px"}) }            }
        };

        $scope.clientHover = function (num) {
            // TweenMax.to(document.getElementById('client-image-' + num), 0.5, {
            //     height: "225px",
            //     width: "225px",
            //     ease: Power3.easeOut
            // })
        };
        $scope.clientHoverLeave = function (num) {
            //     TweenMax.to(document.getElementById('client-image-' + num), 0.25, {
            //         height: "200px",
            //         width: "200px"
            // })
        };

        $scope.articleHover = function (num) {
            // TweenMax.to(document.getElementById('article-pic-' + num), 0.5, {
            //     height: "225px",
            //     width: "225px",
            //     ease: Power3.easeOut
            // })
        };
        $scope.articleHoverLeave = function (num) {
            // TweenMax.to(document.getElementById('article-pic-' + num), 0.25, {
            //     height: "200",
            //     width: "200px"
            // })
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/30/2017.
 */
(function () {

    angular.module('app').directive('mobileNavDir', function () {
        return {
            restrict: 'E',
            templateUrl: './directives/mobile-nav/mobile-nav.html',
            controller: 'mobileNavCtrl'
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/30/2017.
 */
(function () {
    angular.module('app').controller('mobileNavCtrl', function ($scope, mainService) {

        var tl = new TimelineMax(),
            mobileNav = document.getElementById('mobile-nav-popup'),
            trigger = true,
            hamburgerOne = document.getElementById('hamburger-one'),
            hamburgerTwo = document.getElementById('hamburger-two'),
            hamburgerThree = document.getElementById('hamburger-three');

        $scope.exitNav = function () {

            if (trigger) {
                tl.to(hamburgerTwo, 0.08, { top: "47%" }).to(hamburgerOne, 0.08, { top: "47%" }).to(hamburgerThree, 0.08, { top: "47%" }).to(hamburgerOne, 0, { opacity: 0 }).to(hamburgerThree, 0.08, { transform: "rotate(45deg)" }).to(hamburgerTwo, 0.08, { transform: "rotate(-45deg)" }).to(mobileNav, 0.15, { right: 0, ease: Power2.easeIn });
            }if (!trigger) {
                tl.to(hamburgerThree, 0.08, { transform: "rotate(0deg)" }).to(hamburgerTwo, 0.08, { transform: "rotate(0deg)" }).to(hamburgerThree, 0.08, { top: "86%" }).to(hamburgerOne, 0.08, { opacity: 1, top: 0 }).to(hamburgerTwo, 0.08, { top: "47%" }).to(mobileNav, 0.15, { right: "-101%", ease: Power2.easeOut });
            }

            trigger = !trigger;
        };
    });
})();
'use strict';

(function () {
    angular.module('app').controller('navCtrl', function ($scope) {

        var lastNavTitle = "";

        $scope.routeLighter = function (num) {

            var title = document.getElementById('nav-item-title-' + num),
                lastTitle = document.getElementById('nav-item-title-' + lastNavTitle);

            if (num === "home") {
                TweenMax.to(lastTitle, 0.1, {
                    color: "#95989A"
                });

                lastNavTitle = "";
                return;
            }

            if (lastNavTitle !== "" && lastNavTitle !== num) {
                TweenMax.to(lastTitle, 0.1, {
                    color: "#95989A"
                });
            }

            TweenMax.to(title, 0.25, {
                color: "white"
            });

            lastNavTitle = num;
        };

        $scope.navDropper = function (num) {

            TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.1, {
                ease: Power3.easeIn,
                display: "flex",
                height: "500px"
            });

            TweenMax.to(document.getElementById('nav-item-drop-' + num), 1, {
                color: "#242424"
            });
        };

        $scope.navShrinker = function (num) {

            TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.1, {
                color: "transparent"
            });
            TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.1, {
                ease: Power3.easeIn,
                display: "none",
                height: 0
            }, 0.25);
        };

        $scope.dropDownHover = function (num) {

            TweenMax.to(document.getElementById('drop-down-item-' + num), 0.2, {
                backgroundColor: "rgba(22,22,22,0.8)",
                color: "#BD9A35"
            });
        };

        $scope.dropDownHoverLeave = function (num) {
            TweenMax.to(document.getElementById('drop-down-item-' + num), 0.1, {
                backgroundColor: "rgba(255,255,255,0.8)",
                color: "#242424"
            });
        };
    });
})();
'use strict';

(function () {

  angular.module('app').directive('navDir', function () {
    return {
      restrict: 'E',
      templateUrl: './directives/nav/navTmpl.html',
      controller: 'navCtrl'
    };
  });
})();
//# sourceMappingURL=maps/bundle.js.map
