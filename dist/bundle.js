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
    }).state('tds', {
      url: '/work/tds',
      controller: 'tdsCtrl',
      templateUrl: './components/tds/tds.html'
    }).state('garfield', {
      url: "/work/garfield",
      controller: 'garfieldCtrl',
      templateUrl: './components/garfield/garfield.html'
    }).state('tuacahn', {
      url: "/work/tuacahn",
      controller: 'tuacCtrl',
      templateUrl: './components/tuacahn/tuacahn.html'
    }).state('uintah', {
      url: "/work/uintah",
      controller: 'uintahCtrl',
      templateUrl: './components/uintah/uintah.html'
    }).state('uvhba', {
      url: "/work/uvhba",
      controller: 'uvhbaCtrl',
      templateUrl: './components/uvhba/uvhba.html'
    }).state('maxxsouth', {
      url: "/work/maxxsouth",
      controller: "maxxsouthCtrl",
      templateUrl: "./components/maxxsouth/maxxsouth.html"
    }).state('moab', {
      url: "/work/moab",
      controller: 'moabCtrl',
      templateUrl: "./components/moab/moab.html"
    }).state('zerorez', {
      url: "/work/zerorez",
      controller: "zerorezCtrl",
      templateUrl: "./components/zerorez/zerorez.html"
    }).state('workfront', {
      url: "/work/workfront",
      controller: "wfrontCtrl",
      templateUrl: "./components/workfront/workfront.html"
    }).state('us', {
      url: "/work/us",
      controller: "usCtrl",
      templateUrl: "./components/us/us.html"
    }).state('brio', {
      url: "/work/brio",
      controller: "brioCtrl",
      templateUrl: "./components/brio/brio.html"
    }).state('ccbh', {
      url: "/work/ccbh",
      controller: "ccbhCtrl",
      templateUrl: "./components/ccbh/ccbh.html"
    }).state('beehive', {
      url: "/work/beehive",
      controller: "beehiveCtrl",
      templateUrl: "./components/beehive/beehive.html"
    }).state('rubys', {
      url: "/work/rubys",
      controller: "rubysCtrl",
      templateUrl: "./components/rubys/rubys.html"
    }).state('creef', {
      url: "/work/creef",
      controller: "creefCtrl",
      templateUrl: "./components/creef/creef.html"
    }).state('b2scapes', {
      url: "/work/b2scapes",
      controller: "b2Ctrl",
      templateUrl: "./components/b2scapes/b2scapes.html"
    }).state('branding', {
      url: "/work/branding",
      controller: "brandingCtrl",
      templateUrl: "./components/branding/branding.html"
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

        this.backgrounds = ["../../images/work-backgrounds/relic1.jpg", "../../images/work-backgrounds/relic1.jpg", "../../images/work-backgrounds/relic2.jpg", "../../images/work-backgrounds/relic3.jpg", "../../images/work-backgrounds/relic4.jpg", "../../images/work-backgrounds/relic5.jpg", "../../images/work-backgrounds/relic6.jpg", "../../images/work-backgrounds/relic7.jpg", "../../images/work-backgrounds/relic8.jpg", "../../images/work-backgrounds/relic9.jpg", "../../images/work-backgrounds/relic10.jpg", "../../images/work-backgrounds/relic11.jpg"];
    });
})();
'use strict';

/**
 * Created by Seth on 8/16/2017.
 */
(function () {
    angular.module('app').controller('aboutCtrl', function ($scope, mainService) {

        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

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
 * Created by Seth on 8/21/2017.
 */
(function () {
            angular.module('app').controller('b2Ctrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('b2-background');

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
            angular.module('app').controller('beehiveCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('beehive-background');

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
            angular.module('app').controller('brandingCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('branding-background');

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
            angular.module('app').controller('brioCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('brio-background');

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
            angular.module('app').controller('ccbhCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('ccbh-background');

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
 * Created by Seth on 8/14/2017.
 */
(function () {
        angular.module('app').controller('contactCtrl', function ($scope, mainService) {

                $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

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

                // Parse the URL
                function getParameterByName(name) {
                        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                            results = regex.exec(location.search);
                        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                }
                // Give the URL parameters variable names
                var source = getParameterByName('utm_source');
                var medium = getParameterByName('utm_medium');
                var campaign = getParameterByName('utm_campaign');

                // Put the variable names into the hidden fields in the form.
                document.getElementsByName("utm_source").value = source;
                document.getElementsByName("utm_medium").value = medium;
                document.getElementsByName("utm_campaign").value = campaign;

                console.log(source, medium, campaign);

                ///*******************  Google Analytics Legacy Tracking Code  *******************/

                //
                //                let source, medium, term, content,campaign, session_count, pageview_count;
                //
                //         let hostname = document.location.hostname;
                //         console.log(hostname);
                //         hostname = hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
                //         hostname = hostname.toLowerCase();
                //
                //         let _gaq = _gaq || [];
                // // DON'T UPDATE THE GA ACCOUNT ID - Your site should be tracked using Universal Analytics outside this JavaScript code
                //         _gaq.push(['sfga._setAccount', 'UA-XXXYYYZZZ-1']);
                //         _gaq.push(['sfga._setDomainName', hostname]);
                //         _gaq.push(['sfga._setAllowLinker', true]);
                //         _gaq.push(['sfga._trackPageview']);
                //         _gaq.push(function(){get_campaign_info();});
                //
                //         (function() {
                //             let ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                //             ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                //             let s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                //         })();
                //
                //         /*******************  Set Up Cross Domain Tracking  *******************/
                //
                //         let arr = document.getElementsByTagName("a");
                //
                //         for(let i=0; i < arr.length; i++)
                //         {
                //             let tmp = arr[i].getAttribute("onclick");
                //             let doname ="";
                //             try
                //             {
                //                 doname = arr[i].hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
                //                 doname = doname.toLowerCase();
                //             }
                //             catch(err)
                //             {
                //                 doname = arr[i].href;
                //             }
                //
                //             if (tmp !== null)
                //             {
                //                 tmp = String(tmp);
                //                 if (tmp.indexOf('_gasf.push') > -1)
                //                     continue;
                //             }
                //
                //             for (let j = 0; j < domains.length; j++)
                //             {
                //                 //Auto-Linker
                //                 if ( doname !== hostname && doname.indexOf(domains[j]) !== -1 && doname.indexOf("mailto:") === -1)
                //                 {
                //
                //                     arr[i].setAttribute("onclick",""+((tmp !== null) ? tmp + '; ' : '')+"_gaq.push(['sfga._link', '"+arr[i].href+"']); return false;");
                //                 }
                //             }
                //         }
                //
                //         /*******************  Set Up Cross Domain Tracking  *******************/
                //
                // //This function extracts the "_utma", "_utmb", "_utmc" and "_utmz" strings from the cookies set by Google Analytics
                // //This function was originally written by the Google Analytics team (urchin.js)
                //
                //         function get_campaign_info()
                //         {
                //             let utma = get_utm_value(document.cookie, '__utma=', ';');
                //             let utmb = get_utm_value(document.cookie, '__utmb=', ';');
                //             let utmc = get_utm_value(document.cookie, '__utmc=', ';');
                //             let utmz = get_utm_value(document.cookie, '__utmz=', ';');
                //
                //             source = get_utm_value(utmz, 'utmcsr=', '|');
                //             medium = get_utm_value(utmz, 'utmcmd=', '|');
                //             term = get_utm_value(utmz, 'utmctr=', '|');
                //             content = get_utm_value(utmz, 'utmcct=', '|');
                //             campaign = get_utm_value(utmz, 'utmccn=', '|');
                //             let gclid = get_utm_value(utmz, 'utmgclid=', '|');
                //
                //             session_count = get_session_count(utma);
                //             pageview_count = get_pageview_count(utmb, utmc);
                //
                //             if (gclid !== "-") {
                //                 source = 'google';
                //                 medium = 'cpc';
                //             }
                //
                //             console.log(source, medium, term, content,campaign, session_count, pageview_count);
                //         }
                //
                //         get_campaign_info();
                //
                //         function get_utm_value(l,n,s)
                //         {
                //             if (!l || l === "" || !n || n === "" || !s || s === "") return "-";
                //             let i, j, k, utm="-";
                //             i=l.indexOf(n);
                //             k=n.indexOf("=")+1;
                //
                //             if (i > -1)
                //             {
                //                 j=l.indexOf(s,i);
                //                 if (j < 0)
                //                 {
                //                     j=l.length;
                //                 }
                //                 utm=l.substring((i+k),j);
                //             }
                //             return utm;
                //         }
                //
                // //This function extracts the "Count of Sessions" value from the _utma cookie
                //         function get_session_count(str)
                //         {
                //             let i, vc='-';
                //             if (str !== '-') {
                //                 i = str.lastIndexOf(".");
                //                 i++;
                //                 vc = str.substring(i);
                //             }
                //             return vc;
                //         }
                //
                // //This function extracts the "Count of Pageviews" value from the _utmb cookie
                //         function get_pageview_count(utmb,utmc)
                //         {
                //             let i, j, pc='-';
                //             if(utmb !== '-' && utmc !== '-'){
                //                 utmc=utmc+'.';
                //
                //                 i=utmc.length;
                //                 j=utmb.indexOf(".", i);
                //                 pc=utmb.substring(i,j);
                //             }
                //             return pc;
                //         }

        });
})();
'use strict';

/**
 * Created by Seth on 8/21/2017.
 */
(function () {
            angular.module('app').controller('creefCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('creef-background');

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
 * Created by Seth on 8/22/2017.
 */
(function () {
            angular.module('app').controller('demandgenCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

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

            $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

            window.onscroll = function () {
                  var offSet = window.pageYOffset;

                  mainService.navBackground(offSet);
            };
      });
})();
'use strict';

/**
 * Created by Seth on 8/21/2017.
 */
(function () {
            angular.module('app').controller('garfieldCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('garfield-background');

                        window.onscroll = function () {
                                    var offSet = window.pageYOffset,
                                        csParaStart = offSet * 0.75;

                                    mainService.navBackground(offSet);
                                    mainService.parallaxIt(backgroundPic, csParaStart);
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

            if (window.innerWidth > 850) {
                headlineContent.style.top = 50 + csParaStart * 0.0755 + "%";
                backgroundGrad.style.opacity = 0.5 - csParaStart * 0.004;
            }
            if (window.innerWidth < 425) {
                // headlineContent.style.opacity = 1 - (csParaStart * 0.0085);
                headlineContent.style.top = headlineContent.style.top - 50 + "%";
                backgroundGrad.style.opacity = 0.5 - csParaStart * 0.8;
            }
            if (window.innerWidth < 851) {
                headlineContent.style.opacity = 1 - csParaStart * 0.0025;
                headlineContent.style.top = 50 + csParaStart * 0.15 + "%";
                backgroundGrad.style.opacity = 0.5 - csParaStart * 0.4;
            }

            if (window.innerWidth > 1400) {
                homeMainBack.style.backgroundPositionY = -281 + csParaStart + 'px';
            }if (window.innerWidth < 1400 && window.innerWidth > 1100) {
                homeMainBack.style.backgroundPositionY = -124 + csParaStart + 'px';
            }if (window.innerWidth < 1100 && window.innerWidth > 850) {
                homeMainBack.style.backgroundPositionY = -50 + csParaStart + 'px';
            }if (window.innerWidth < 850) {
                homeMainBack.style.backgroundPositionY = -50 + csParaStart + 'px';
            }
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/21/2017.
 */
(function () {
            angular.module('app').controller('maxxsouthCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('maxxsouth-background');

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
            angular.module('app').controller('moabCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('moab-background');

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
 * Created by Seth on 8/23/2017.
 */
(function () {
    angular.module('app').controller('newsroomCtrl', function ($scope, mainService) {

        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

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
 * Created by Seth on 8/21/2017.
 */
(function () {
            angular.module('app').controller('rubysCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('rubys-background');

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
 * Created by Seth on 8/11/2017.
 */
(function () {
    angular.module('app').controller('servicesCtrl', function ($scope, $location, $anchorScroll, mainService) {

        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

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
            intro: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas.",
            sections: [{ number: "one", title: "Creative Strategy" }, { number: "two", title: "Campaign Development" }, { number: "three", title: "Branding" }, { number: "four", title: "Graphic Design" }, { number: "five", title: "TV/Radio Production" }, { number: "six", title: "Digital Media" }, { number: "seven", title: "Web Design/Development" }]
        }, {
            title: 'creative',
            intro: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas.",
            sections: [{}, {}, {}, {}]
        }, {
            title: 'demand gen',
            intro: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas.",
            sections: [{ number: "one", title: "Content Syndication" }, { number: "two", title: "Marketing Automation" }, { number: "three", title: "Facebook Paid Ads" }, { number: "four", title: "Facebook Lead Gen Ads" }, { number: "five", title: "Account Based Marketing" }, { number: "six", title: "Retargeting" }, { number: "seven", title: "PPC" }, { number: "eight", title: "Twitter Paid Ads" }, { number: "nine", title: "Appointment Setting" }, { number: "ten", title: "Direct Mail" }, { number: "eleven", title: "SEO" }, { number: "twelve", title: "LinkedIn Ads" }]
        }, {
            title: 'digital',
            intro: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas.",
            sections: [{}, {}, {}, {}]
        }, {
            title: 'pr & content',
            intro: "There isn't much that can accelerate a company like awesome creative work.  Relic can take you from step one to rocking your creative, hipster socks off.  We'll guide from concepts and ideas to concrete creative products that will blow your customer's minds.  We can do it because we are creative Michelangelos ourselves; beautiful, innovative work comes as easily to us as Nutella on bananas.",
            sections: [{}, {}, {}, {}]
        }];

        $scope.lastNum = "";

        $scope.servicesMobile = function (num, top) {
            var mobileExpand = document.getElementById('services-mobile-expand-' + num),
                mobileExpandLast = document.getElementById('services-mobile-expand-' + $scope.lastNum),
                contentMobile = document.getElementById('content-mobile-content-' + num),
                arrow = document.getElementById('mobile-expand-arrow-' + num),
                lastArrow = document.getElementById('mobile-expand-arrow-' + $scope.lastNum),
                lastContentMobile = document.getElementById('content-mobile-content-' + $scope.lastNum),
                mainContainer = document.getElementById('services-main-container'),
                servicesMobile = document.getElementById('services-mobile');

            if (mobileExpand.style.height === "200vh" && num === $scope.lastNum) {

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
            }if ($scope.lastNum !== "" && num !== $scope.lastNum) {

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

            TweenMax.to(mainContainer, 0.5, {
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
        };
    });
})();
'use strict';

/**
 * Created by Seth on 8/21/2017.
 */
(function () {
            angular.module('app').controller('tdsCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

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

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

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

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

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

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

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
            angular.module('app').controller('tuacCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('tuac-background');

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
            angular.module('app').controller('uintahCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('uintah-background');

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
            angular.module('app').controller('usCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('us-background');

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
            angular.module('app').controller('uvhbaCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('uvhba-background');

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
            angular.module('app').controller('workCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

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
 * Created by Seth on 8/21/2017.
 */
(function () {
            angular.module('app').controller('wfrontCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('wfront-background');

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
            angular.module('app').controller('zerorezCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('zerorez-background');

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
                    height: "270vh"
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

//navCtrl.js

(function () {
    angular.module('app').controller('navCtrl', function ($scope) {

        var lastNavTitle = "";

        $scope.routeLighter = function (num) {
            var title = document.getElementById('nav-item-title-' + num),
                lastTitle = document.getElementById('nav-item-title-' + lastNavTitle);
            if (num === "home") {
                TweenMax.to(lastTitle, 0.15, {
                    color: "#95989A"
                });
                lastNavTitle = "";
                return;
            }
            if (lastNavTitle !== "" && lastNavTitle !== num) {
                TweenMax.to(lastTitle, 0.15, {
                    color: "#95989A"
                });
            }

            TweenMax.to(title, 0.25, {
                color: "white"
            });
            lastNavTitle = num;
        };

        $scope.navDropper = function (num) {
            TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.15, {
                ease: Power1.easeIn,
                display: "flex",
                opacity: 1,
                height: "auto"
            });

            TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.4, {
                color: "#242424"
            });
        };

        $scope.navShrinker = function (num) {
            TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.15, {
                color: "transparent"
            });
            TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.15, {
                ease: Power3.easeIn,
                opacity: 0,
                display: "none"
                //height: 0
            }, 0.25);
        };

        $scope.dropDownHover = function (num) {
            TweenMax.to(document.getElementById('drop-down-item-' + num), 0.25, {
                backgroundColor: "rgba(22,22,22,0.8)",
                color: "#BD9A35"
            });
        };

        $scope.dropDownHoverLeave = function (num) {
            TweenMax.to(document.getElementById('drop-down-item-' + num), 0.15, {
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
