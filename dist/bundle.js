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
    }).state('work', {
      url: '/work',
      controller: 'workCtrl',
      templateUrl: './components/work/work.html'
    }).state('tds', {
      url: '/work/tds',
      controller: 'tdsCtrl',
      templateUrl: './components/tds/tds.html'
    }).state('newsroom', {
      url: '/newsroom',
      controller: 'newsroomCtrl',
      templateUrl: './components/newsroom/newsroom.html'
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
  angular.module('app').controller('expertiseCtrl', function ($scope) {

    $scope.expertCoolize = function (num) {

      var expertise = document.getElementById('expertise-content-' + num);

      console.log(expertise);

      TweenMax.fromTo(expertise, 1, {
        height: "2px",
        color: "transparent"
      }, {
        height: "calc(100vw / 6)",
        backgroundColor: "rgba(255,255,255,0.8)"
      });
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

            mainService.navBackground(offSet);

            headlineContent.style.opacity = 1 - csParaStart * 0.0019;
            headlineContent.style.top = 50 + csParaStart * 0.075 + "%";
            backgroundGrad.style.opacity = 0.5 - csParaStart * 0.004;

            if (window.innerWidth > 1400) {
                homeMainBack.style.backgroundPositionY = -281 + csParaStart + 'px';
            }if (window.innerWidth < 1400 && window.innerWidth > 1100) {
                homeMainBack.style.backgroundPositionY = -124 + csParaStart + 'px';
            }if (window.innerWidth < 1100) {
                homeMainBack.style.backgroundPositionY = -50 + csParaStart + 'px';
            }
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
    angular.module('app').controller('servicesCtrl', function ($scope, mainService) {

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
    });
})();
'use strict';

/**
 * Created by Seth on 8/21/2017.
 */
(function () {
    angular.module('app').controller('tdsCtrl', function ($scope, mainService) {

        var backgroundPic = document.getElementById('tds-background');

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
  angular.module('app').controller('workCtrl', function ($scope, mainService) {});
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

        $scope.ctaShow = function () {
            TweenMax.to(document.getElementById('cta-pop-up'), 0.5, {
                ease: Power2.easeIn,
                display: 'inline'
            });
        };

        $scope.ctaHide = function () {
            TweenMax.to(document.getElementById('cta-pop-up'), 0.5, {
                ease: Power2.easeIn,
                display: 'none'
            });
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
            articles = document.getElementById('articles');

        $scope.switchContent = function (switcher) {

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
                backgroundColor: "#161616",
                color: "#BD9A35"
            });
        };

        $scope.dropDownHoverLeave = function (num) {
            TweenMax.to(document.getElementById('drop-down-item-' + num), 0.1, {
                backgroundColor: "white",
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
