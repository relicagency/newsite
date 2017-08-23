'use strict';

(function () {
  angular.module('app', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', config]).run(['$rootScope', '$window', scrollFix]);

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/home',
      controller: 'homeCtrl',
      templateUrl: './components/home/home.html'
    }).state('/expertise', {
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

        var lastLeader = '';
        var expand = true;

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
  angular.module('app').controller('demandgenCtrl', function ($scope, mainService) {});
})();
'use strict';

(function () {
  angular.module('app').controller('expertiseCtrl', function ($scope) {});
})();
'use strict';

/**
 * Created by Seth on 8/23/2017.
 */
(function () {
    angular.module('app').controller('newsroomCtrl', function ($scope, mainService) {

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

(function () {
      angular.module('app').controller('homeCtrl', function ($scope) {

            var homeMainContainer = document.getElementById('home-hero'),
                headlineContent = document.getElementById('headline-content'),
                backgroundGrad = document.getElementById('home-linear-grad'),
                navBackdrop = document.getElementById('nav-backdrop');

            window.onscroll = function () {
                  var csParaStart = window.pageYOffset * 0.75;

                  homeMainContainer.style.backgroundPositionY = csParaStart + "px";
                  headlineContent.style.opacity = 1 - csParaStart * 0.0019;
                  headlineContent.style.top = 50 + csParaStart * 0.075 + "%";
                  backgroundGrad.style.opacity = 0.5 - csParaStart * 0.004;

                  if (window.pageYOffset > 100) {
                        TweenMax.to(navBackdrop, 2, { opacity: "0.8" });
                  }if (window.pageYOffset < 95) {
                        TweenMax.to(navBackdrop, 2, { opacity: 0 });
                  }
            };

            // let video = document.getElementsByClassName('home-video');
            //
            // let playButton = document.getElementsByClassName('play-pause');
            // let mute = document.getElementsByClassName('mute');
            // let fullScreen = document.getElementsByClassName('full-screen');
            //
            // let seekBar = document.getElementsByClassName('seek-bar');
            // let volumeBar = document.getElementsByClassName('volume-bar');
            //
            // playButton.addEventListener('click', function(){
            //     if(video.paused == true){
            //         video.play();
            //
            //         playButton.innerHTML = 'Pause'
            //     } else{
            //         video.pause();
            //         playButton.innerHTML = 'Play'
            //     }
            //
            // });
            //
            // mute.addEventListener('click', function(){
            //     if(video.muted == false){
            //         video.muted = true;
            //         mute.innerHTML = 'Unmute'
            //     } else {
            //         video.muted = false;
            //
            //         mute.innerHTML = 'Mute'
            //     }
            // });
            //
            // fullScreen.addEventListener('click', function(){
            //     if(video.requestFullScreen){
            //         video.requestFullScreen();
            //     }  else if (video.mozRequestFullScreen){
            //         video.mozRequestFullScreen();
            //     } else if (video.webkitRequestFullScreen){
            //         video.webkitRequestFullScreen();
            //     }
            // });
            //
            // seekBar.addEventListener('change', function(){
            //     let time = video.duration * (seekBar.value / 100)
            //     video.currentTime = time;
            // });
            //
            // video.addEventListener('timeupdate', function(){
            //     let value = (100 / video.duration) * video.currentTime;
            //     seekBar.value = value;
            // });
            //
            // seekBar.addEventListener('mousedown', function(){
            //     video.pause();
            // });
            // seekBar.addEventListener('mouseup', function(){
            //     video.play();
            //     playButton.innerHTML = 'Pause'
            // });
            //
            // volumeBar.addEventListener('change', function () {
            //     video.volume = volumeBar.value;
            // });
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
        $scope.content = 0;

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
  angular.module('app').controller('tdsCtrl', function ($scope, mainService) {});
})();
'use strict';

/**
 * Created by Seth on 8/21/2017.
 */
(function () {
  angular.module('app').controller('techCtrl', function ($scope, mainService) {});
})();
'use strict';

/**
 * Created by Seth on 8/21/2017.
 */
(function () {
  angular.module('app').controller('telecomCtrl', function ($scope, mainService) {});
})();
'use strict';

/**
 * Created by Seth on 8/17/2017.
 */
(function () {
  angular.module('app').controller('tourismCtrl', function ($scope, mainService) {});
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
            TweenMax.fromTo(document.getElementById('footer-social-' + social), 1, { height: "40px", width: "40px" }, { height: "35px", width: "35px" });
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

            if (num === "four") {
                TweenMax.to(document.getElementById('services-content-' + num), 0.5, { ease: Power2.easeOut, height: "250px" }, 0.25);
            } else {
                TweenMax.to(document.getElementById('services-content-' + num), 0.5, { ease: Power2.easeOut, height: "350px" }, 0.25);
            }
        };

        $scope.swnContentHoverLeave = function (num) {
            if (num === "four") {
                TweenMax.to(document.getElementById('services-content-' + num), 0.25, { ease: Power2.easeOut, height: "200px" });
            } else {
                TweenMax.to(document.getElementById('services-content-' + num), 0.25, { ease: Power2.easeOut, height: "300px" });
            }
        };

        $scope.clientHover = function (num) {
            TweenMax.to(document.getElementById('client-image-' + num), 0.5, {
                height: "225px",
                width: "225px",
                ease: Power3.easeOut
            });
        };
        $scope.clientHoverLeave = function (num) {
            TweenMax.to(document.getElementById('client-image-' + num), 0.25, {
                height: "200px",
                width: "200px"
            });
        };

        $scope.articleHover = function (num) {
            TweenMax.to(document.getElementById('article-pic-' + num), 0.5, {
                height: "225px",
                width: "225px",
                ease: Power3.easeOut
            });
        };
        $scope.articleHoverLeave = function (num) {
            TweenMax.to(document.getElementById('article-pic-' + num), 0.25, {
                height: "200",
                width: "200px"
            });
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

(function () {
    angular.module('app').controller('navCtrl', function ($scope) {

        $scope.navDropper = function (num) {

            console.log('Yo!!!');

            TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.4, {
                ease: Power3.easeIn,
                display: "flex",
                height: "500px"
            });
        };

        $scope.navShrinker = function (num) {
            TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.25, {
                ease: Power3.easeIn,
                display: "none",
                height: 0
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
