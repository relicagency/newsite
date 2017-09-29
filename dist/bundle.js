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
      url: '/services/:num',
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
                top: picLax / 2 + "px"
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

        this.backgrounds = ["../../images/work-backgrounds/relic1.jpg", "../../images/work-backgrounds/relic1.jpg", "../../images/work-backgrounds/relic2.jpg", "../../images/work-backgrounds/relic3.jpg", "../../images/work-backgrounds/relic4.jpg", "../../images/work-backgrounds/relic5.jpg", "../../images/work-backgrounds/relic6.jpg", "../../images/work-backgrounds/relic7.jpg", "../../images/work-backgrounds/relic8.jpg", "../../images/work-backgrounds/relic9.jpg", "../../images/work-backgrounds/relic10.jpg", "../../images/work-backgrounds/relic10.jpg"];
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

            if (route === 'leadership') {

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

        $scope.expandLeader = function (leader) {

            if (window.innerWidth < 769) {

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

            if (window.innerWidth < 425) {

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

            if (lastLeader !== leader) {
                expand = true;
            }

            if (expand === true && window.innerWidth > 425) {

                TweenMax.to(document.getElementById('about-main-container'), 0.5, {
                    height: "295vh"
                });
            } else if (!expand) {
                TweenMax.to(document.getElementById('about-main-container'), 0.5, {
                    height: "216vh"
                });
            }if (expand === true && window.innerWidth < 425) {

                TweenMax.to(document.getElementById('about-main-container'), 0.5, {
                    height: "450vh"
                });
            } else if (!expand) {
                TweenMax.to(document.getElementById('about-main-container'), 0.5, {
                    height: "400vh"
                });
            }

            if (leader === 'adam') {
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "95vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            }if (leader === 'jordan') {
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "80vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            }if (leader === 'colby') {
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "65vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            }if (leader === 'jessica' && window.innerWidth < 1025) {
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "90vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            }if (leader === 'jessica' && window.innerWidth > 1024) {
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "90vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            }if (leader === 'hannah' && window.innerWidth < 1025) {
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "75vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            }if (leader === 'hannah' && window.innerWidth > 1024) {
                TweenMax.to(document.getElementById('leader-' + leader), 0.5, {
                    height: "75vh",
                    ease: Power3.easeIn
                });
                TweenMax.to(document.getElementById('leader-about-' + leader), 0.5, {
                    opacity: 1
                });
                expand = true;
            }

            if (lastLeader !== "" && document.getElementById('leader-' + lastLeader).style.height !== "175px") {

                TweenMax.to(document.getElementById('leader-' + lastLeader), 0.5, {
                    ease: Power3.easeOut,
                    height: "175px"
                });
                TweenMax.to(document.getElementById('leader-about-' + lastLeader), 0.15, {
                    opacity: 0
                });

                expand = false;
            }

            if (lastLeader !== leader) {
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

            lastLeader = leader;
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
    angular.module('app').controller('servicesCtrl', function ($scope, $stateParams, $location, $anchorScroll, mainService) {

        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };

        var lastAccordion = "";
        var lastTopSec = -1;
        var backgroundPic = document.getElementById('services-background');
        $scope.content = $stateParams.num;

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
        $scope.changeContent($stateParams.num);

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.75;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic, csParaStart);
        };

        $scope.hoverContent = function (num) {};

        $scope.accordionPop = function (num) {

            TweenMax.to(document.getElementById('accordion-pop-' + num), 0.5, {
                ease: Power3.easeIn,
                height: "auto"
            });
            TweenMax.to(document.getElementById('accordion-pop-' + num), 0.25, {
                color: "#161616"
            });
            TweenMax.to(document.getElementById('plus-sign-' + num), 0.5, {
                transform: "rotate(315deg)"
            });

            if (lastAccordion !== "" && document.getElementById('accordion-pop-' + lastAccordion).style.height !== "0px") {

                TweenMax.to(document.getElementById('accordion-pop-' + lastAccordion), 0.05, {
                    color: "transparent"
                });
                TweenMax.to(document.getElementById('accordion-pop-' + lastAccordion), 0.5, {
                    ease: Power3.easeOut,
                    height: 0
                });
                TweenMax.to(document.getElementById('plus-sign-' + lastAccordion), 0.5, {
                    transform: "rotate(0deg)"
                });
            }

            lastAccordion = num;
        };

        $scope.content = 0;

        $scope.services = [{
            title: 'Traditional Media',
            intro: "There are certain things in life that are risky. Asking out that girl you’ve been eyeing across the room? Risky. Looking into a new investment? Risky. The movie Risky Business? Ironically, not that risky. However, traditional media and media buying should never have you on the edge of your seat. Relic has media buying experts who focus on negotiating and planning to guarantee the highest return for each client.",
            sections: [{ number: "one", title: "TV", info: ["We’ve noticed a myth going around. No, not that one about Steve in accounting and his weirdly large left foot – myth about TV spots. Some people are led to believe that TV advertisements have been completely supplanted by digital marketing, but that’s not the case. There is strength in a good TV spot, and Relic’s media team ensures that your TV ads are presented to the correct demographics to leave a lasting impact on your audience."] }, { number: "two", title: "Radio", info: ["Did you know that it’s scientifically proven that everybody listens to music? Everyone. You know that person you’re thinking of who may not listen to music? Nope, they do too. The fact that everyone loves music means radio spots bring tremendous advertising value. A radio ad is wonderful because it is exactly like a shotgun Vegas wedding – cost effective, time efficient, and it leaves a trail of measurable results."] }, { number: "three", title: "Print/Newspaper", info: ["Much like Apple products, print ads and newspapers have been permeating our lives for as long as we can remember, and these items are not leaving any time soon. There’s a good reason for it, too. Print advertising offers certain advantages that create tangible and distinct results. Printed ads in magazines target niche markets, while newspapers target regional audiences. Loyal readership provides a sense of trust that can be used to your advantage. Relic’s media team finds the perfect publications for your ads and delivers measurable results on them."] }, { number: "four", title: "Outdoor Advertising", info: ["Imagine the cool breeze running through your hair, the sounds of nature in your ears, the beautiful smell of exhaust—there’s nothing quite like the great outdoors. Turns out, it’s also a great place to advertise. Relic’s team has been working with unique, distinguishable outdoor advertising for years. We know exactly what it takes to ensure the best results for your campaign. From roadside billboards to public transit banners, Relic delivers the best placement for your ads to ensure you have the greatest reach, the best ROI and drive the most engagement with your products."] }, { number: "five", title: "Direct Mail", info: ["Direct mail offers the opportunity to personally connect with an audience in an original way that sets you apart from the competition. The key to building any relationship with a customer is communicating a clear message and making it personal. Studies found that once a direct mail piece is opened, the recipient is more likely to engage with the company. Relic’s team has seen remarkable success with our direct mail pieces. In fact, I’m currently recruiting Relic to send out direct mail pieces to potential dating partners. Stay tuned for an update. (Update: apparently I’m married and my wife was not happy with what turned up in our mail today. Though it did intrigue her enough to open it)."] }, { number: "six", title: "Sponsorships", info: ["Sponsorship advertising is a great way to build up a reputable brand image for your company. Sponsoring a local event will insert your brand name in the forefront of the minds of the public. Additionally, sponsorships can build priceless PR value. Being a part of these sponsored events will show the positive impact you have on your community. The hardest part of sponsorships is finding the best events to be a part of, and Relic’s team knows the exact information your audience will want to see. Always keep in mind the importance of relevance. There’s a reason you never see events such as the “Nike Hotdog Eating Contest.”"] }]
        }, {
            title: 'Creative',
            intro: "Do you remember the last advertisement you saw? Creating a message that resonates can be difficult. Our creative team specializes in delivering unforgettable campaigns, content and designs. Good creative should communicate the same message as when you meet your in-laws for the first time−a strong, memorable directive that leaves just enough of an impact that you’ll linger in the back of their minds. It’s a tough balance, but we’ll work with you to ensure that we deliver creative that knocks your customers’ weirdly colorful socks off.",
            sections: [{ number: "one", title: "Creative Strategy", info: ["Any successful company, brand or campaign has a creative strategy behind it. Believe it or not, this is actually not decided by blindly throwing darts in the Museum of Modern Art and seeing what we hit. It consists of detailed market research, a strategic plan and an effective delivery. The creative team at Relic provides top-of-the-line design from our best and brightest minds, ensuring that your campaign delivers the best results."] }, { number: "two", title: "Campaign Development", info: ["From conception to execution, the creative development of a campaign will shape the future of your company. At Relic, we believe that collaboration and attentiveness are the tenets to any successful campaign. While we work with you to develop the correct strategy, we will combine your vision with our renowned creative expertise. As all the pieces of our jigsaw puzzle of ideas come together, that’s when you’ll see the sparks fly. In a good way. Nothing is on fire, don’t worry."] }, { number: "three", title: "Branding", info: ["Every brand has a story to tell. The creative techniques behind branding will reflect the message you convey to the public. Why do certain brands stick with you? Why are you loyal to certain brands but not others? The answer is simple. In today’s content-driven society, a compellingly crafted story will do more for your bottom line than ads. But if you’ve ever been in a job interview, you know that sometimes it’s hard to recognize what sets you apart. Let Relic highlight your company’s unique qualities. You have a story worth telling; let us share it."] }, { number: "four", title: "Graphic Design", info: ["Graphic design is the backbone for any creative work. But like your parents taught you, “Actions speak louder than words,” and we at Relic think that our graphics speak fairly loud. Check out our design portfolio from our client work. (LINK TO WORK PAGES)"] }, { number: "five", title: "TV/Radio Production", info: ["When the radio was invented in 1895, Guglielmo Marconi was quoted saying that he couldn’t wait for Relic to take full advantage of his invention (don’t fact check us on that). The flattery paid off, and now Relic is producing many TV and radio spots every year. Specifically targeted TV and radio ads are still tremendously valuable today, and Relic has the production process down."] }, { number: "six", title: "Web Design/Development", info: ["Relic also offers website design and development services. From complete web overhaul to slight, but important, adjustments, our web team will prove to be invaluable. We’ll take your website from the lame Neville Longbottom in the first Harry Potter to the snake-slaying hero from the last movie.]"] }]
        }, {
            title: 'Demand Generation',
            intro: "B2B demand generation is not a new concept, but it’s one that can be approached in new ways. Ultimately, demand gen is the process of collecting leads on new business, and there are countless ways to approach this. With big data, in-depth analytics tools and more resources at your fingertips, demand gen has never had a more direct correlation to your company’s bottom line than it does today. However, you can only contribute to that revenue stream once you have properly structured your marketing efforts around demand gen.",
            sections: [{ number: "one", title: "Content Syndication", info: ["Ready to take your demand gen to the next level? More often than not, the main barrier holding you back is your content syndication – the process of pushing your high quality content to third-parties, allowing you to be viewed by a much broader audience. So why not syndicate your own content? Well, like killing your own turkey for Thanksgiving dinner, poor execution can lead to disastrous results. One of the best ways to keep a steady stream of new prospects joining your funnel is to syndicate your high performing content to established and engaged audiences, and Relic’s team will ensure that everything is done to perfection."] }, { number: "two", title: "Marketing Automation", info: ["You may think that all those emails you get from businesses are spam, but you’re getting them for a reason. They’re effective! Proper marketing automation planning and execution will not only generate leads for your business, it can push leads all the way through your conversion funnel. Marketing automation is also the perfect way to build brand awareness. The more you’re on your audience’s mind, the more likely they are to purchase."] }, { number: "three", title: "Social Media Advertisements", info: ["Did you know that the average person spends over five years on of their life on social media? With so much time being spent pretending to care about your friends from high school, social media presents a huge marketing opportunity. Relic’s team targets the correct audiences at the correct time to get your ad in front of the correct people on all social media platforms. With both paid and lead generation ads, your top-of-funnel marketing efforts will be filled with qualified opportunities. Think of social media ads as a teenage girl. Does anyone care that Stephanie doesn’t have a homecoming date? Of course not, but get the post in front of the perfect audience at the appropriate time, and she just might generate some leads."] }, { number: "five", title: "Account Based Marketing", info: ["Consider how weird B2B marketing truly is. You are trying to create a plan to bring in many businesses, each with their own strengths, weaknesses and challenges, by using a singular plan. While this overarching method can be extraordinarily successful, some businesses may not see this as the best tactic. Account based marketing presents your business in a personal setting to allow for a more intimate connection with your brand. One-on-one communication fosters lasting relationships that create extended business opportunities for your company. Relic’s demand gen team can help to create this personal connection and deliver lasting customer relationships."] }, { number: "six", title: "Retargeting", info: ["Contrary to popular belief, retargeting is not visiting Target twice in one day, as fun as that sounds. Retargeting is actually a highly effective demand gen tactic that tracks visitors to your site. As users are browsing the web, your retargeting ads will be shown to them, turning window shoppers into buyers. Don’t know where to get started? That’s what Relic is here for."] }, { number: "seven", title: "PPC", info: ["What better place to advertise than where customers are actively searching for your product? Our experienced, paid search campaign managers will select relevant keywords to ensure your business appears at the top of Google’s and other search engines’ results when those keywords are entered. Our campaigns are optimized monthly to eliminate waste. And no, we’re not talking about firing Toby in HR. He’s actually super helpful."] }, { number: "eight", title: "Direct Mail", info: ["Direct mail offers the opportunity to personally connect with an audience in an original way that sets you apart from the competition. The key to building any relationship with a customer is communicating a clear message and making it personal. Studies found that once a direct mail piece is opened, the recipient is more likely to engage with the company. Relic’s team has seen remarkable success with our direct mail pieces. In fact, I’m currently recruiting Relic to send out direct mail pieces to potential dating partners. Stay tuned for an update. (Update: apparently I’m married and my wife was not happy with what turned up in our mail today. Though it did intrigue her enough to open it)."] }, { number: "eleven", title: "SEO", info: ["Google is the most trusted resource on the internet. That’s why it’s responsible for almost 3/4 of all web searches. If your website doesn’t match Google’s search results, your competitor could overtake your position and poach your potential sales. Our SEO team is well versed in Google’s latest algorithms and ready to make sure your site stays at the top of Google and other search engines’ organic results.]"] }]
        }, {
            title: 'Digital',
            intro: "Marketing has always been about connecting with your audience in the right place at the right time. With people spending more time online, it has become apparent that often the best place to advertise is online. Relic’s digital team is experts in every aspect of online marketing, from SEO to website optimization to in-depth analytics. Read about our best digital offerings below, then contact us when you realize that we are the heaven-sent digital marketing agency that you have been waiting for.",
            sections: [{ number: "one", title: "PPC", info: ["What better place to advertise than where customers are actively searching for your product? Our experienced, paid search campaign managers will select relevant keywords to ensure your business appears at the top of Google’s and other search engines’ results when those keywords are entered. Our campaigns are optimized monthly to eliminate waste. And no, we’re not talking about firing Toby in HR. He’s actually super helpful."] }, { number: "two", title: "SEO", info: ["Google is the most trusted resource on the internet. That’s why it’s responsible for almost 3/4 of all web searches. If your website doesn’t match Google’s search results, your competitor could overtake your position and poach your potential sales. Our SEO team is well versed in Google’s latest algorithms and ready to make sure your site stays at the top of Google and other search engines’ organic results."] }, { number: "three", title: "Social Media Advertisements", info: ["Did you know that the average person spends over five years on of their life on social media? With so much time being spent pretending to care about your friends from high school, social media presents a huge marketing opportunity. Relic’s team targets the correct audiences at the correct time to get your ad in front of the correct people on all social media platforms. With both paid and lead generation ads, your top-of-funnel marketing efforts will be filled with qualified opportunities. Think of social media ads as a teenage girl. Does anyone care that Stephanie doesn’t have a homecoming date? Of course not, but get the post in front of the perfect audience at the appropriate time, and she just might generate some leads."] }, { number: "four", title: "Facebook Instant Articles", info: ["Instant Articles are a new way to interact with your consumers on Facebook. Loading 10 times faster than normal links, Instant Articles are 20 percent more likely to be read and 70 percent less likely to be abandoned, making adorable puppies the only other thing less likely to abandoned. Relic’s digital team is always on top of new online marketing opportunities, and Instant Articles is one of the latest digital techniques we have seen success with."] }, { number: "five", title: "Display Advertisements", info: ["With the amount of time spent online, web advertising is vital for any business, so let us help you out. Relic uses display ads to effectively communicate your message through graphic design images, rich media, video, audio, flash and more. With our display ads, you’ll get noticed more than Liam Neeson’s fictional children get kidnapped."] }, { number: "six", title: "Marketing Automation", info: ["You may think that all those emails you get from businesses are spam, but you’re getting them for a reason. They’re effective! Proper marketing automation planning and execution will not only generate leads for your business, it can push leads all the way through your conversion funnel. Marketing automation is also the perfect way to build brand awareness. The more you’re on your audience’s mind, the more likely they are to purchase."] }, { number: "seven", title: "Website Optimization", info: ["Just because you desire a change on your website doesn’t mean you should do it. Our website optimization team will A/B test changes on your website to make sure the site is converting at the highest rate possible. This testing ensures that all images, buttons, copy and other web functions operate properly on all devices. Let data drive the decision making on your website so that you have time to focus on more important things, like how Arie became the next bachelor over Peter when clearly Peter deserved it. Just look at that face."] }, { number: "eight", title: "Reporting & Analytics", info: ["Spend your money where it counts. If you’re going to try the shotgun approach and just throw money at something and hope it works, we would prefer if you throw that money at us. We investigate your target markets and get to know what they like and what they are talking about in order to create an efficient campaign. Our professionals research which ads and posts work the best for your audience through our extensive reporting and analytics.]"] }]
        }, {
            title: 'PR & Content',
            intro: "While certain reality TV stars may have lead you to believe that any press is good press, we vehemently disagree. Public relations exists for the exact opposite reason; we ensure that you and your company are represented in the best possible light. PR is necessary because it will boost credibility in ways advertising simply cannot. Relic’s team specializes in media pitches, press releases, social media, website content and more in order to increase the public awareness of our clients and their unique work and offerings. For more information on Relic’s PR resources, click on any of the tabs below. For less information, click here.",
            sections: [{
                number: "one",
                title: "Media Relations",
                info: ["Our PR team has established trusted relationships with members of the media, resulting in maximum reach. Need a press release to be distributed? We know the perfect outlets to contact to reach your target audience. Need to monitor the media and reactions to recent events? Our team is on top of it. Need to convince the media that you own three fire-breathing dragons who are coming to take over the continental United States? Honestly, we probably can’t help you with that, but contact us immediately. We want in."]
            }, {
                number: "two",
                title: "Brand Management",
                info: ["Dealing with backlash from the dragon fiasco? Don’t worry, Relic’s PR team has you covered. Brand management is right up our wheelhouse. Our team has experience assisting clients in communicating clearly and effectively with the media in order to get the correct message to the correct people and minimize potential damage. Check our work with Garfield County during its fire crisis to learn more. (LINK HERE)", "Additionally, Relic’s PR team will be the best hype-man you’ve ever had. In today’s world, having a strong, recognizable brand will go a long way in driving business. Our team will ensure that everything associated with your company’s name involves sunshine, rainbows and Single Ladies by Beyoncé"]
            }, {
                number: "three",
                title: "Event Planning and Management",
                info: ["One of the best ways to build PR value is by giving people bags of cash. Unfortunately, we’re not cartoon villains, so we found an even better alternative: events. Big or small, events will build valuable relationships with the public, and the best part is that Relic’s team will handle everything. As we work with you to schedule the perfect venues, book the best entertainment and order the most delicious food, you’ll see the power and influence that a successful event can bring."]
            }, {
                number: "four",
                title: "Social Media Management",
                info: ["Good news, social media provides a platform that makes it simple to reach your target audience and deliver any message at any time.", "Bad news, the people browsing social media typically have the attention span of a fly with ADHD, and whatever you’re publishing isn’t nearly as interesting as their cat videos or dancing hotdog memes.", "If you want to reach your target market, you’re going to need to provide content that is relevant and specific to them. That just so happens to be Relic’s expertise. Our content team does extensive research to identify the correct audiences to target, then creates and delivers the necessary content to give your company its greatest reach. We monitor the impact of our social media posts through analytics tools and make any adjustments needed going forward. We’re always looking for new, innovative ways to reach your target audiences."]
            }, {
                number: "five",
                title: "Content Marketing",
                info: ["Words are powerful! You can write to your heart’s content, but without proper strategy and execution, you’ll be writing to no avail. With good writers and a detailed content plan, content marketing pieces can provide incredible value. With website copy, blog posts, newsletters and everything in between, a specific content plan and goal is essential to provide both purpose and substance. Relic’s content team has experience writing everything from short blog posts to long-form white papers, and we’re waiting for you to tap into our expertise."]
            }, {
                number: "six",
                title: "Creative Copywriting",
                info: ["Most copy today is boring. There. We said it. It’s like having a conversation with one of your exes: dry, emotionless and makes you feel like you’re being taken advantage of. Luckily, our copywriting team at Relic has solved this issue.", "If you’ve ever seen a superhero movie, there’s always a moment where the hero realizes that they’re meant for something more. At Relic, we like to think of copywriting as our superhero moment. We showcase that our clients are meant for something more; we just use pens to demonstrate that, rather than guns, swords and orphaned children.", "Our copywriting team will write anything and everything for you – radio scripts, TV spots, billboard copy, direct mail pieces, emails or anything else you need. All your content needs will be handled by our supremely talented, extraordinarily attractive writers. (No I’m not one of them, why do you ask?)"]
            }]
        }];

        $scope.lastNum = "";

        // $scope.servicesMobile = function(num, top){
        //
        //     let mobileExpand = document.getElementById('services-mobile-expand-' + num),
        //         mobileExpandLast = document.getElementById('services-mobile-expand-' + $scope.lastNum),
        //         contentMobile = document.getElementById('content-mobile-content-' + num),
        //         arrow = document.getElementById('mobile-expand-arrow-' + num),
        //         lastArrow = document.getElementById('mobile-expand-arrow-' + $scope.lastNum),
        //         lastContentMobile = document.getElementById('content-mobile-content-' + $scope.lastNum),
        //         mainContainer = document.getElementById('services-main-container');
        //         // servicesMobile = document.getElementById('services-mobile');
        //
        //
        //     if( mobileExpand.style.height === "200vh" && num === $scope.lastNum ){
        //
        //         TweenMax.to(mobileExpand, 0, {
        //             color: "transparent"
        //         });
        //         TweenMax.to(mobileExpand, 0.5, {
        //             display: "none",
        //             height: 0
        //         });
        //         TweenMax.to(arrow, 0.75, {
        //             transform: "rotateX(0deg)"
        //         });
        //         TweenMax.to( mainContainer, 0.75, {
        //             height: "320vh"
        //         });
        //         // TweenMax.to(servicesMobile, 0.75, {
        //         //     height: "280vh"
        //         // });
        //         // TweenMax.to(contentMobile, 0.75, {
        //         //     marginBottom: "5vw"
        //         // });
        //
        //         return;
        //     }  if($scope.lastNum !== "" && num !== $scope.lastNum){
        //
        //         console.log(mobileExpandLast.style.height);
        //
        //         TweenMax.to(lastArrow, 0.75, {
        //             transform: "rotateX(0deg)"
        //         });
        //         TweenMax.to(lastContentMobile, 0.1, {
        //             marginBottom: "5vw"
        //         });
        //         TweenMax.to(mobileExpandLast, 0, {
        //            color: "transparent"
        //         });
        //         TweenMax.to(mobileExpandLast, 0.1, {
        //             display: "none",
        //             height: 0
        //         });
        //         // TweenMax.to(contentMobile, 0.25, {
        //         //     marginBottom: "200vh"
        //         // });
        //         TweenMax.to(mobileExpand, 0.5, {
        //             display: "flex",
        //             height: "200vh",
        //             color: "#bd9a35"
        //         });
        //         TweenMax.to(arrow, 0.75, {
        //             transform: "rotateX(180deg)"
        //         });
        //
        //         $scope.lastNum = num;
        //
        //         return;
        //
        //     }
        //
        //     TweenMax.to( mainContainer, 0.5, {
        //         height: "520vh"
        //     });
        //     // TweenMax.to(servicesMobile, 0.5, {
        //     //     height: "480vh"
        //     // });
        //     TweenMax.to(contentMobile, 0.5, {
        //         marginBottom: "200vh"
        //     });
        //     TweenMax.to(mobileExpand, 0.5, {
        //         display: "flex",
        //         height: "200vh",
        //         color: "#bd9a35"
        //     });
        //     TweenMax.to(arrow, 0.75, {
        //         transform: "rotateX(180deg)"
        //         });
        //
        //     $scope.lastNum = num;
        //
        // };

        $scope.servicesMobile = function (num, top) {

            var mobileExpand = document.getElementById('services-mobile-expand-' + num),
                mobileExpandLast = document.getElementById('services-mobile-expand-' + $scope.lastNum),
                arrow = document.getElementById('mobile-expand-arrow-' + num),
                lastArrow = document.getElementById('mobile-expand-arrow-' + $scope.lastNum);

            if (mobileExpand.style.height === "auto" && num === $scope.lastNum) {

                TweenMax.to(mobileExpand, 0, {
                    color: "transparent"
                });
                TweenMax.to(mobileExpand, 0.5, {
                    height: 0
                });
                TweenMax.to(arrow, 0.75, {
                    transform: "rotateX(0deg)"
                });

                return;
            }if ($scope.lastNum !== "" && num !== $scope.lastNum) {

                TweenMax.to(lastArrow, 0.75, {
                    transform: "rotateX(0deg)"
                });
                TweenMax.to(mobileExpandLast, 0.1, {
                    color: "transparent",
                    height: 0
                });
                TweenMax.to(mobileExpand, 0.5, {
                    height: "auto",
                    color: "#161616"
                });
                TweenMax.to(arrow, 0.75, {
                    transform: "rotateX(180deg)"
                });

                $scope.lastNum = num;

                return;
            }

            TweenMax.to(mobileExpand, 0.5, {
                height: "auto",
                color: "#161616"
            });
            TweenMax.to(arrow, 0.75, {
                transform: "rotateX(180deg)"
            });

            $scope.lastNum = num;
        };

        $scope.mobileInnerExpand = function () {
            console.log('Its working.....');
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

        $scope.ctaText = "Learn how we can help you.";

        if (window.location.href.indexOf('tourism') > -1) {
            $scope.ctaText = "Looking to bring more visitors to you area?";
        }if (window.location.href.indexOf('demandgen') > -1) {
            $scope.ctaText = "Looking for demand gen help?";
        }

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

            if (num === "four") {
                TweenMax.to(document.getElementById('services-content-' + num), 0.5, { ease: Power2.easeOut, height: "200px", width: "200px" }, 0.25);
            } else {
                TweenMax.to(document.getElementById('services-content-' + num), 0.5, { ease: Power2.easeOut, height: "250px", width: "250px" }, 0.25);
            }
        };

        $scope.swnContentHoverLeave = function (num) {
            if (num === "four") {
                TweenMax.to(document.getElementById('services-content-' + num), 0.25, { ease: Power2.easeOut, height: "175px", width: "175px" });
            } else {
                TweenMax.to(document.getElementById('services-content-' + num), 0.25, { ease: Power2.easeOut, height: "225px", width: "225px" });
            }
        };

        $scope.clientHover = function (num) {
            TweenMax.to(document.getElementById('client-image-' + num), 0.05, {
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

        $scope.exitNav = function (section) {

            if (section !== "dont") {
                TweenMax.to(document.getElementById('mobile-nav-section-' + section), 0.05, {
                    backgroundColor: "rgba(255,255,255,1)",
                    ease: Power2.easeIn
                });
            }

            if (trigger) {
                tl.to(hamburgerTwo, 0.08, { top: "44%", backgroundColor: "#262626" }).to(hamburgerOne, 0.08, { top: "47%", backgroundColor: "#262626" }).to(hamburgerThree, 0.08, { top: "47%", backgroundColor: "#262626" }).to(hamburgerOne, 0, { opacity: 0 }).to(hamburgerThree, 0.08, { transform: "rotate(45deg)" }).to(hamburgerTwo, 0.08, { transform: "rotate(-45deg)" }).to(mobileNav, 0.15, { right: 0, ease: Power2.easeIn });
            }if (!trigger && section !== "dont") {
                tl.to(hamburgerThree, 0.08, { transform: "rotate(0deg)" }).to(hamburgerTwo, 0.08, { transform: "rotate(0deg)" }).to(hamburgerThree, 0.08, { top: "86%", backgroundColor: "white" }).to(hamburgerOne, 0.08, { opacity: 1, top: 0, backgroundColor: "white" }).to(hamburgerTwo, 0.08, { top: "45%", backgroundColor: "white" }).to(mobileNav, 0.15, { right: "-101%", ease: Power2.easeOut }).to(document.getElementById('mobile-nav-section-' + section), 0, { backgroundColor: "transparent" });
            }if (!trigger) {
                tl.to(hamburgerThree, 0.08, { transform: "rotate(0deg)" }).to(hamburgerTwo, 0.08, { transform: "rotate(0deg)" }).to(hamburgerThree, 0.08, { top: "86%", backgroundColor: "white" }).to(hamburgerOne, 0.08, { opacity: 1, top: 0, backgroundColor: "white" }).to(hamburgerTwo, 0.08, { top: "44%", backgroundColor: "white" }).to(mobileNav, 0.15, { right: "-101%", ease: Power2.easeOut });
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
