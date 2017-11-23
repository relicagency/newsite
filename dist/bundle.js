'use strict';

/**
 * @license angular-recaptcha build:2017-04-24
 * https://github.com/vividcortex/angular-recaptcha
 * Copyright (c) 2017 VividCortex
 **/

/*global angular, Recaptcha */
(function (ng) {
    'use strict';

    ng.module('vcRecaptcha', []);
})(angular);

/*global angular */
(function (ng) {
    'use strict';

    function throwNoKeyException() {
        throw new Error('You need to set the "key" attribute to your public reCaptcha key. If you don\'t have a key, please get one from https://www.google.com/recaptcha/admin/create');
    }

    var app = ng.module('vcRecaptcha');

    /**
     * An angular service to wrap the reCaptcha API
     */
    app.provider('vcRecaptchaService', function () {
        var provider = this;
        var config = {};
        provider.onLoadFunctionName = 'vcRecaptchaApiLoaded';

        /**
         * Sets the reCaptcha configuration values which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param defaults  object which overrides the current defaults object.
         */
        provider.setDefaults = function (defaults) {
            ng.copy(defaults, config);
        };

        /**
         * Sets the reCaptcha key which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param siteKey  the reCaptcha public key (refer to the README file if you don't know what this is).
         */
        provider.setSiteKey = function (siteKey) {
            config.key = siteKey;
        };

        /**
         * Sets the reCaptcha theme which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param theme  The reCaptcha theme.
         */
        provider.setTheme = function (theme) {
            config.theme = theme;
        };

        /**
         * Sets the reCaptcha stoken which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param stoken  The reCaptcha stoken.
         */
        provider.setStoken = function (stoken) {
            config.stoken = stoken;
        };

        /**
         * Sets the reCaptcha size which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param size  The reCaptcha size.
         */
        provider.setSize = function (size) {
            config.size = size;
        };

        /**
         * Sets the reCaptcha type which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param type  The reCaptcha type.
         */
        provider.setType = function (type) {
            config.type = type;
        };

        /**
         * Sets the reCaptcha language which will be used by default is not specified in a specific directive instance.
         *
         * @param lang  The reCaptcha language.
         */
        provider.setLang = function (lang) {
            config.lang = lang;
        };

        /**
         * Sets the reCaptcha badge position which will be used by default if not specified in a specific directive instance.
         *
         * @param badge  The reCaptcha badge position.
         */
        provider.setBadge = function (badge) {
            config.badge = badge;
        };

        /**
         * Sets the reCaptcha configuration values which will be used by default is not specified in a specific directive instance.
         *
         * @since 2.5.0
         * @param onLoadFunctionName  string name which overrides the name of the onload function. Should match what is in the recaptcha script querystring onload value.
         */
        provider.setOnLoadFunctionName = function (onLoadFunctionName) {
            provider.onLoadFunctionName = onLoadFunctionName;
        };

        provider.$get = ['$rootScope', '$window', '$q', '$document', function ($rootScope, $window, $q, $document) {
            var deferred = $q.defer(),
                promise = deferred.promise,
                instances = {},
                recaptcha = void 0;

            $window.vcRecaptchaApiLoadedCallback = $window.vcRecaptchaApiLoadedCallback || [];

            var callback = function callback() {
                recaptcha = $window.grecaptcha;

                deferred.resolve(recaptcha);
            };

            $window.vcRecaptchaApiLoadedCallback.push(callback);

            $window[provider.onLoadFunctionName] = function () {
                $window.vcRecaptchaApiLoadedCallback.forEach(function (callback) {
                    callback();
                });
            };

            function getRecaptcha() {
                if (!!recaptcha) {
                    return $q.when(recaptcha);
                }

                return promise;
            }

            function validateRecaptchaInstance() {
                if (!recaptcha) {
                    throw new Error('reCaptcha has not been loaded yet.');
                }
            }

            // Check if grecaptcha is not defined already.
            if (ng.isDefined($window.grecaptcha)) {
                callback();
            } else {
                // Generate link on demand
                var script = $window.document.createElement('script');
                script.async = true;
                script.defer = true;
                script.src = 'https://www.google.com/recaptcha/api.js?onload=' + provider.onLoadFunctionName + '&render=explicit';
                $document.find('body').append(script);
            }

            return {

                /**
                 * Creates a new reCaptcha object
                 *
                 * @param elm  the DOM element where to put the captcha
                 * @param conf the captcha object configuration
                 * @throws NoKeyException    if no key is provided in the provider config or the directive instance (via attribute)
                 */
                create: function create(elm, conf) {

                    conf.sitekey = conf.key || config.key;
                    conf.theme = conf.theme || config.theme;
                    conf.stoken = conf.stoken || config.stoken;
                    conf.size = conf.size || config.size;
                    conf.type = conf.type || config.type;
                    conf.hl = conf.lang || config.lang;
                    conf.badge = conf.badge || config.badge;

                    if (!conf.sitekey || conf.sitekey.length !== 40) {
                        throwNoKeyException();
                    }
                    return getRecaptcha().then(function (recaptcha) {
                        var widgetId = recaptcha.render(elm, conf);
                        instances[widgetId] = elm;
                        return widgetId;
                    });
                },

                /**
                 * Reloads the reCaptcha
                 */
                reload: function reload(widgetId) {
                    validateRecaptchaInstance();

                    recaptcha.reset(widgetId);

                    // Let everyone know this widget has been reset.
                    $rootScope.$broadcast('reCaptchaReset', widgetId);
                },

                /**
                 * Executes the reCaptcha
                 */
                execute: function execute(widgetId) {
                    validateRecaptchaInstance();

                    recaptcha.execute(widgetId);
                },

                /**
                 * Get/Set reCaptcha language
                 */
                useLang: function useLang(widgetId, lang) {
                    var instance = instances[widgetId];

                    if (instance) {
                        var iframe = instance.querySelector('iframe');
                        if (lang) {
                            // Setter
                            if (iframe && iframe.src) {
                                var s = iframe.src;
                                if (/[?&]hl=/.test(s)) {
                                    s = s.replace(/([?&]hl=)\w+/, '$1' + lang);
                                } else {
                                    s += (s.indexOf('?') === -1 ? '?' : '&') + 'hl=' + lang;
                                }

                                iframe.src = s;
                            }
                        } else {
                            // Getter
                            if (iframe && iframe.src && /[?&]hl=\w+/.test(iframe.src)) {
                                return iframe.src.replace(/.+[?&]hl=(\w+)([^\w].+)?/, '$1');
                            } else {
                                return null;
                            }
                        }
                    } else {
                        throw new Error('reCaptcha Widget ID not exists', widgetId);
                    }
                },

                /**
                 * Gets the response from the reCaptcha widget.
                 *
                 * @see https://developers.google.com/recaptcha/docs/display#js_api
                 *
                 * @returns {String}
                 */
                getResponse: function getResponse(widgetId) {
                    validateRecaptchaInstance();

                    return recaptcha.getResponse(widgetId);
                },

                /**
                 * Gets reCaptcha instance and configuration
                 */
                getInstance: function getInstance(widgetId) {
                    return instances[widgetId];
                },

                /**
                 * Destroy reCaptcha instance.
                 */
                destroy: function destroy(widgetId) {
                    delete instances[widgetId];
                }
            };
        }];
    });
})(angular);

/*global angular, Recaptcha */
(function (ng) {
    'use strict';

    var app = ng.module('vcRecaptcha');

    app.directive('vcRecaptcha', ['$document', '$timeout', 'vcRecaptchaService', function ($document, $timeout, vcRecaptcha) {

        return {
            restrict: 'A',
            require: "?^^form",
            scope: {
                response: '=?ngModel',
                key: '=?',
                stoken: '=?',
                theme: '=?',
                size: '=?',
                type: '=?',
                lang: '=?',
                badge: '=?',
                tabindex: '=?',
                required: '=?',
                onCreate: '&',
                onSuccess: '&',
                onExpire: '&'
            },
            link: function link(scope, elm, attrs, ctrl) {
                scope.widgetId = null;

                if (ctrl && ng.isDefined(attrs.required)) {
                    scope.$watch('required', validate);
                }

                var removeCreationListener = scope.$watch('key', function (key) {
                    var callback = function callback(gRecaptchaResponse) {
                        // Safe $apply
                        $timeout(function () {
                            scope.response = gRecaptchaResponse;
                            validate();

                            // Notify about the response availability
                            scope.onSuccess({ response: gRecaptchaResponse, widgetId: scope.widgetId });
                        });
                    };

                    vcRecaptcha.create(elm[0], {

                        callback: callback,
                        key: key,
                        stoken: scope.stoken || attrs.stoken || null,
                        theme: scope.theme || attrs.theme || null,
                        type: scope.type || attrs.type || null,
                        lang: scope.lang || attrs.lang || null,
                        tabindex: scope.tabindex || attrs.tabindex || null,
                        size: scope.size || attrs.size || null,
                        badge: scope.badge || attrs.badge || null,
                        'expired-callback': expired

                    }).then(function (widgetId) {
                        // The widget has been created
                        validate();
                        scope.widgetId = widgetId;
                        scope.onCreate({ widgetId: widgetId });

                        scope.$on('$destroy', destroy);

                        scope.$on('reCaptchaReset', function (event, resetWidgetId) {
                            if (ng.isUndefined(resetWidgetId) || widgetId === resetWidgetId) {
                                scope.response = "";
                                validate();
                            }
                        });
                    });

                    // Remove this listener to avoid creating the widget more than once.
                    removeCreationListener();
                });

                function destroy() {
                    if (ctrl) {
                        // reset the validity of the form if we were removed
                        ctrl.$setValidity('recaptcha', null);
                    }

                    cleanup();
                }

                function expired() {
                    // Safe $apply
                    $timeout(function () {
                        scope.response = "";
                        validate();

                        // Notify about the response availability
                        scope.onExpire({ widgetId: scope.widgetId });
                    });
                }

                function validate() {
                    if (ctrl) {
                        ctrl.$setValidity('recaptcha', scope.required === false ? null : Boolean(scope.response));
                    }
                }

                function cleanup() {
                    vcRecaptcha.destroy(scope.widgetId);

                    // removes elements reCaptcha added.
                    ng.element($document[0].querySelectorAll('.pls-container')).parent().remove();
                }
            }
        };
    }]);
})(angular);
'use strict';

(function () {
  angular.module('app', ['ui.router', 'vcRecaptcha']).run(['$rootScope', '$window', scrollFix]).config(['$stateProvider', '$urlRouterProvider', config]);

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
    }).state('inmoment', {
      url: "/work/inmoment",
      controller: "inMomentCtrl",
      templateUrl: "./components/inmoment/inmoment.html"
    }).state('bamboohr', {
      url: "/work/bamboohr",
      controller: "bambooHrCtrl",
      templateUrl: "./components/bamboohr/bamboohr.html"
    }).state('jive', {
      url: "/work/jive",
      controller: "jiveCtrl",
      templateUrl: "./components/jive/jive.html"
    }).state('numetric', {
      url: "/work/numetric",
      controller: "numetricCtrl",
      templateUrl: "./components/numetric/numetric.html"
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
            if (offset > 50) {
                TweenMax.to(nav, 0.5, {
                    backgroundColor: "rgba(0,0,0,0.9)"
                });
            }if (offset < 45) {
                TweenMax.to(nav, 0.5, { backgroundColor: "rgba(0,0,0,0)" });
            }
        };

        this.parallaxIt = function (pic, picLax) {
            TweenMax.to(pic, 0, {
                top: picLax / 2 + "px"
            });
        };

        this.verifyCaptcha = function (str) {

            return $http({
                method: 'POST',
                url: '/relic/verify',
                data: {
                    captchaString: str
                }
            }).then(function (res) {
                return res;
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

        this.navStarted = false;

        this.navGetStarted = function () {
            this.navStarted = !this.navStarted;
        };
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

        var shrinkTheLeader = "";

        $scope.expandLeader = function (leader) {

            var leaderDiv = document.getElementById('leader-' + leader),
                leaderAbout = document.getElementById('leader-about-' + leader),
                shrinkLeader = document.getElementById('leader-' + shrinkTheLeader),
                shrinkLeaderAbout = document.getElementById('leader-about-' + shrinkTheLeader);

            if (leaderDiv.style.height === "auto") {
                TweenMax.to(leaderDiv, 0.25, {
                    ease: Power2.easeIn,
                    height: '200px'
                });
                TweenMax.to(leaderAbout, 0.10, {
                    opacity: 0,
                    ease: Power2.easeIn
                });

                return 0;
            }if (shrinkTheLeader !== leader && shrinkTheLeader !== "") {
                TweenMax.to(shrinkLeader, 0.25, {
                    ease: Power2.easeIn,
                    height: '200px'
                });
                TweenMax.to(shrinkLeaderAbout, 0.10, {
                    opacity: 0,
                    ease: Power2.easeIn
                });
            }

            TweenMax.to(leaderDiv, 0.5, {
                ease: Power2.easeIn,
                height: 'auto'
            });
            TweenMax.to(leaderAbout, 0.10, {
                opacity: 1,
                ease: Power2.easeIn
            });

            shrinkTheLeader = leader;
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

(function () {
            angular.module('app').controller('bambooHrCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('bamboo-background');

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
    angular.module('app').controller('contactCtrl', function ($scope, $timeout, mainService, vcRecaptchaService) {

        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

        var backgroundPic = document.getElementById('contact-background');

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.5050505050505050;

            // backgroundPic.style.bottom = csParaStart + "px";
            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic, csParaStart);
        };

        $scope.response = null;
        $scope.widgetId = null;
        $scope.model = {
            key: '6LfjNi0UAAAAABBsQ1W4gywWWmj8ZM5re4bf5Gcz'
        };
        $scope.setResponse = function (response) {
            console.info('Response available');
            $scope.response = response;
            if (window.innerWidth < 426) {
                window.scrollTo(0, 600);
            }
        };
        $scope.setWidgetId = function (widgetId) {
            console.info('Created widget ID: %s', widgetId);
            $scope.widgetId = widgetId;
        };
        $scope.cbExpiration = function () {
            console.info('Captcha expired. Resetting response object');
            vcRecaptchaService.reload($scope.widgetId);
            $scope.response = null;
        };

        $scope.contactRelic = function (contact) {

            console.log('sending the captcha response to the server', $scope.response);

            mainService.verifyCaptcha($scope.response).then(function (res) {

                console.log(res.data.success);

                if (res.data.success) {

                    console.log('Google has verified the user.');

                    mainService.contactRelic(contact).then(function (response) {
                        console.log(response);
                        if (response.status === 200) {
                            $scope.formStatus = "Awesome!  Looks like your message went through.  We\'ll be in touch with you as soon as possible.";

                            if (window.innerWidth <= 425) {
                                TweenMax.to(document.getElementById('form-status-message'), 0.15, {
                                    display: "flex",
                                    ease: Power2.easeIn,
                                    position: "fixed",
                                    top: 0,
                                    left: 0
                                });
                            }
                            if (window.innerWidth > 426) {
                                TweenMax.to(document.getElementById('form-status-message'), 0.15, {
                                    display: "flex",
                                    position: "absolute",
                                    ease: Power2.easeIn
                                });
                            }
                        }
                    });
                }if (!res.data.success) {
                    console.log('Failed validation');
                    // In case of a failed validation you need to reload the captcha
                    // because each response can be checked just once
                    vcRecaptchaService.reload($scope.widgetId);
                    alert('Sorry, we couldn\'t verify you, please try again.');
                }
            });
        };

        $scope.exitFormStatus = function () {

            TweenMax.to(document.getElementById('form-status-message'), 0.15, {
                display: "none",
                ease: Power2.easeOut
            });

            for (var i in $scope.contact) {
                $scope.contact[i] = null;
            }
            vcRecaptchaService.reload($scope.widgetId);
        };
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

            var backgroundPic = document.getElementById('expertise-background');

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

(function () {
            angular.module('app').controller('inMomentCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('inmoment-background');

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
            angular.module('app').controller('jiveCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('jive-background');

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

        $scope.content = {
            pressReleases: {
                jan: [{
                    title: "Sorenson Advertising Becomes Relic",
                    date: "January 24, 2017",
                    content: ["Sorenson Advertising, an established Utah advertising agency, becomes Relic today.", '“I love the name Relic, because it represents a time when ad agencies had one purpose in mind, to drive sales,” said Adam Stoker, President/CEO of Relic. “The Relic brand represents our young, vibrant and motivated team who takes proven and modern tactics to create fully integrated marketing campaigns that  increase sales.”', "Relic launched a fresh, new look with its rebrand. They changed from the red and white theme from Sorenson Advertising to a clean black and sheer gold, which is now publicly displayed on their new website at www.relicagency.com.", "Recently, in September 2016, Stoker announced the purchase of Sorenson Advertising with three partners, Jordan Barker, Chief Digital Officer, Colby Remund, Creative Director and Nick Christensen. With this new employee-led leadership team, the agency’s focus became geared towards generating value and making marketing dollars an investment, not an expense.", '“Along with this new management team, Relic has introduced new service offerings like reporting and analytics, testing and optimization, marketing automation and event planning and management,” Barker said. “We have already seen high adoption rates from current clients and significant interest from prominent businesses in Utah.”', "The company also recently moved locations from north Orem to historic downtown Provo, giving the fast-growing company even more opportunities to find quality personnel from the two nearby universities—Brigham Young University and Utah Valley University.", '“I am excited about Relic and the new capabilities we have to offer,” Stoker said. “We now have all of the tools and personnel to scale this business not only in the state of Utah, but nationwide.”', "Relic has been recognized for its achievements in the advertising industry. Just last week on January 19, the Utah Business Magazine awarded Relic a Utah Sales And Marketing of the Year (SAMY) Award for its content marketing campaign, The Origin of Adventure, for the Uintah County Office of Tourism."]
                }],
                feb: [{
                    title: "Adam Stoker, President and CEO of Relic, Receives Forty Under 40 Award",
                    date: "February 21, 2017",
                    content: ["Once a year, young Utah professionals are recognized for their late nights, long hours and hard work through Utah Business Magazine’s Forty Under 40 award. Adam Stoker, President and CEO of Relic—formally Sorenson Advertising—is one of those professionals to receive the 2017 award.", '“I am honored to receive the Forty Under 40 Award,” Stoker said. “Being nominated alongside all of these talented and smart business men and women is a privilege. However, I wouldn’t have received this award if it wasn’t for the amazing staff that I work with; they are what differentiates Relic from other agencies.”', "This award is given to 40 up-and-coming Utah professionals under the age of 40 who have gone above and beyond their normal roles. The program honors professionals in diverse skills and industries, such as nonprofit, technology, start-ups and corporations. Each nominee goes through a rigorous application process and must meet strict criteria.", '“Adam definitely deserves the Forty under 40 Award,” said Colby Remund, Chief Creative Officer. Remund has worked alongside Stoker for more than five years. “Adam is a born leader who is respected and loved by many clients. Over the last five years, I have seen Adam put many long hours into this company.”', "After working for Sorenson Advertising for five years and climbing within the company, Stoker, along with his three partners, Jordan Barker, Colby Remund and Nick Christensen, purchased the small agency. Since the purchase, Stoker became president and CEO and immediately initiated changes within the company in order to meet the needs of its current and future clients.", "In January 2017, Sorenson Advertising did a full rebrand and changed its name to Relic. The agency created a new logo and updated its website. Relic also moved locations from Orem to downtown Provo. The rebrand reflects Relic’s new focus on generating value and making marketing dollars an investment, not an expense.", "Relic represents a time when advertising agencies were created for a specific purpose—to drive sales. Somewhere along the way, ad agencies became captivated by what some call “vanity” metrics (likes, clicks, impressions, views, visits, etc). While many of those upper-funnel metrics are important, Relic judges the ultimate success of an ad campaign by the revenue generated.", "Since the rebrand, Relic has received Utah Business Magazine’s award for Utah Sales And Marketing of the Year (SAMY) Award for its content marketing campaign, The Origin of Adventure, for the Uintah County Office of Tourism."]
                }],
                mar: [{
                    title: "Utah ad agency sets its sights on Montana tourism",
                    date: "March 7, 2017",
                    content: ["A Utah advertising agency is setting its sights on the tourism industry in Montana. Relic—a small agency based in Provo, Utah—is a sponsor of the Montana Governor’s Conference on Tourism and Recreation March 12-14.", "Relic is currently working with seven of Utah’s tourism offices, including Wasatch County, Iron County, Garfield County, Grand County, Uintah County, Washington County, and Wayne County. Just this year, Relic collected two awards for its advertising campaign with Uintah County Tourism—a SAMY from Utah Business Magazine and a Telly Award for the accompanying video.", "In 2015, Relic’s campaign for Garfield County was awarded Best Ad Campaign by the Utah Tourism Industry Association and Utah Office of Tourism. Relic has also done a variety of work to promote other areas, including Bryce Canyon National Park, Dinosaurland, Moab, Cedar City and others.", '“With our experience promoting travel and tourism to these incredible Utah locations, expanding into other areas of the intermountain west is a natural fit for our team,” said Adam Stoker, President and CEO of Relic. “We’re looking at Montana because we think the it is one of the most beautiful places in the world, and we’re passionate about that region.”', "The market in Montana has many similarities with the market in Utah, Stoker went on to explain.", '“There are great tourism attractions in rural markets that need better support, resources and services,” Stoker said. “We’ve seen through our own experiences how promoting an area worldwide leads to more tourism and, in turn, better infrastructure within a community. We hope to make that same impact in Montana.”', "The upcoming conference will be held at the Radisson Colonial Hotel in Helena, Montana from March 12-14. As a sponsor, Relic will have a booth set up at the conference for attendees to view and ask questions. At the booth, attendees will have the opportunity to enter a raffle to win a DJI drone. They will also get a chance to see Relic’s award-winning work and meet the owners of the company."]
                }, {
                    title: "High school friends take different paths, end up as business partners",
                    subtitle: "Friends of almost 20 years, served in same mission, now own an advertising agency in Provo",
                    date: "March 22, 2017",
                    content: ["How often do two best friends live the dream of owning a business together? Adam Stoker, President and CEO of Relic, and Jordan Barker, Chief Digital Officer at Relic, went from high school best friends to business partners.", 'The two met through mutual friends at Pleasant Grove High School in Utah. “All of our friends thought Jordan was cool because he had a Ford Mustang. I hadn’t really gotten to know him, so I was a bit skeptical,” Stoker said.', "They stayed friends throughout high school and each prepared to serve missions for The Church of Jesus Christ of Latter-day Saints. Right after high school, Stoker was first to receive his call to the Belo Horizonte, Brazil mission in 2002.", '“I was in Brazil a year and my job was to coordinate the new missionaries’ paperwork,” Stoker said. “I was going through the list of incoming missionaries when I saw Jordan’s picture, meaning he was called to serve in the same mission. I didn’t know anyone else out there, so the chances of having a close friend with me, out of 60,000 missionaries worldwide, was pretty exciting.”', "When Barker arrived, Stoker was able to personally welcome him to Brazil. Barker was grateful to see a familiar face in the foreign country. After only a few weeks in Brazil, Barker became so ill he had to stay in a hospital for a full week.", '“It was a hard time because on top of the illness, I was a new missionary and did not understand the language,” Barker said. “But luckily, Adam was able to stay and hang out with me and help interpret what the doctors were saying during that crazy time.”', "That experience, according to Barker, solidified their friendship. Being in the hospital was difficult, but it was good to have a friend around.", '“Adam knows almost everything about me on a business and personal level,” Barker said. “There aren’t too many people who have seen me at my worst, like that week in Brazil. After an experience like that, becoming business partners was an easy transition.”', "After returning home from their missions, Stoker and Barker were involved with school, internships and the struggle to choose a career. Stoker almost immediately became interested in the advertising industry and invited Barker to work with him part time at a small digital marketing agency in 2008.", '“Seeing how Adam interacted on the business side at that small agency made becoming business partners an easy decision,” Barker said. “In one instance, Adam approached our boss and asked for a pay cut because he was so focused on school at the time. When that happened, I thought to myself, \'that guy has integrity.\'”', "Barker focused his career in digital marketing because and worked for some of the most prominent technology companies in Utah, becoming well-known in the digital marketing and technology communities.", '“Jordan has some of the most advanced digital marketing experience of almost anyone in Utah,” Stoker said. “He knows how to solve any digital marketing problem or challenge. It’s incredibly valuable to have someone like that on your team, especially when that person is a close friend.”', "In 2011, Stoker began working at a small advertising agency in St. George, Utah called, Sorenson Advertising. He quickly moved up the ladder from account executive to director of client services and eventually led the expansion of the business to Utah Valley.", "In the meantime, Barker started and sold his own digital marketing business. He eventually ended up at Pluralsight, one of the foremost technology companies in Utah, where he build its digital marketing department.", "While working at separate entities, Stoker and Barker continued consulting small businesses together as a side project and stayed in touch over the years. They always talked about someday working together; they had a plan to create an agency together that included complete competence in both traditional and digital advertising.", "Opportunity and timing were in Stoker’s favor, and after five years, he saw a chance to purchase Sorenson Advertising from its previous owner. In 2016, Stoker brought Barker, as well as two other business partners, to purchase the advertising company. The dream they had always talked about was becoming a reality.", "In January 2017, the new team rebranded Sorenson Advertising as Relic to better represent the integration of traditional and digital marketing campaigns that Barker and Stoker envisioned for their company.", '“We are in it for long run,” Barker said. “We reinvest back into the business to help it grow and flourish. Owning your own business is overwhelming yet rewarding. Yes, it’s a lot of time away from family and working late nights, but overall, it’s very satisfying to work for yourself.”', "Stoker and Barker’s friendship is apparent as they interact at the office. And this long-lasting friendship runs in their families, their wives and young children get together often.", '“Jordan has become one of the closest people in my life; the two of us compromise really well,” Stoker said. “It has been a blast working with one of my high school buddies. I know our background and relationship will help us continue to grow the business and make an impact on the industries we serve.”']
                }],
                may: [{
                    title: "Relic Agency wins three Bronze Stevie® Awards in 2017 American Business AwardsSM",
                    date: "May 4, 2017",
                    content: ["Relic, a local advertising agency, took home three bronze Stevies in this year’s American Business Awards—the nation’s premier business awards program.", "The first, a video award in the travel and tourism category, was for Relic’s recent “Origin of Adventure” campaign for Uintah County. The campaign has previously won both a Telly Award and a SAMY from Utah Business Magazine.", 'Two of the company’s employees also received some recognition. James Gibson, art director, won an award in the Marketer of the Year category primarily for his outstanding work on the “Origin of Adventure” campaign. In addition to illustrating the characters and animating the video, Gibson performed the voices for both dinosaurs.', "Chelsea Oldroyd, Relic’s public relations manager, won in the Communications Professional of the Year category. Oldroyd has been an integral part of the expansion of the agency’s public relations department. In less than two years, the department has grown from a one-man show to a team of four, with plans to add team members this summer.", '“We have an incredible group here whose hard work and dedication pay off tremendously for our clients,” said Adam Stoker, president and CEO of Relic. “I’m extremely proud of our team for their work on the Origin of Adventure campaign. We’re also all proud of James and Chelsea for representing our company and winning this prestigious award. We couldn’t do what we do without them.”', "More than 3,600 nominations from organizations of all sizes and in virtually every industry were submitted this year for consideration in a wide range of categories, including Startup of the Year, Executive of the Year, Best New Product or Service of the Year, Marketing Campaign of the Year, Live Event of the Year and App of the Year, among others.", "Over 190 professionals worldwide participated in the judging process to select this year’s Stevie Award winners.", '“Each year the judges find the quality and variety of the nominations to be greater than the year before. The 2017 competition was intense, and every organization that has won should be proud,” said Michael Gallagher, president and founder of the Stevie Awards. Details about The American Business Awards and the list of 2017 Stevie winners are available at www.StevieAwards.com/ABA.'],
                    additionalContent: {
                        title: "About the Stevie Awards",
                        text: "Stevie Awards are conferred in seven programs: the Asia-Pacific Stevie Awards, the German Stevie Awards, The American Business Awards, The International Business Awards, the Stevie Awards for Women in Business, the Stevie Awards for Great Employers, and the Stevie Awards for Sales & Customer Service. Stevie Awards competitions receive more than 10,000 entries each year from organizations in more than 60 nations. Honoring organizations of all types and sizes and the people behind them, the Stevies recognize outstanding performances in the workplace worldwide. Learn more about the Stevie Awards at http://www.StevieAwards.com."
                    }

                }, {
                    title: 'Uintah County Office of Tourism, in Collaboration with Relic, Wins a Telly and Stevie Award for “Origin of Adventure” Video',
                    date: "May 5, 2017",
                    content: ["The Uintah County Office of Tourism, in collaboration with Relic, won both a 2017 Telly Award and a 2017 Stevie Award for its \"Origin of Adventure\" video promoting travel and tourism to the county. Relic—a local advertising agency based out of Provo, Utah—has been working with the county since 2015.", "The Telly Awards has named Uintah County as a Bronze winner in recognition of the campaign's 30-second video spot. The commercial tells the story of two cartoon dinosaurs, Vern and Al, who meet on a rafting expedition and continue to explore Dinosaurland in Vernal, Utah. Vernal is full of kid-friendly and thrilling activities, from fossil digs to mountain biking and rodeos to fly-fishing. The video has gained over 124,000 views so far.", "Uintah County also was named winner of a Bronze Stevie Award in the Travel and Tourism category in the 15th Annual American Business Awards. The campaign features a short children's story paralleling the video spot, in addition to creative assets, website content, a scavenger hunt and other marketing materials.", '"We are thrilled to have received these awards," said Lesha Coltharp, director of the Uintah County Office of Tourism. "This has been such a fun campaign to be a part of; our whole community really has rallied around it. This is a well-deserved win for the hardworking people who make Dinosaurland the incredible tourist destination that it is."', "Dinosaurland came to Relic with the challenge of promoting the unique destination to kids and their families. The area is most well-known for its \"Wall of Bones\"—a structure encasing 1,500 exposed dinosaur bones—but not as well known for its outdoor activities, although there are plenty.", '"Our creative team came up with the idea of using cartoon dinosaurs during a brainstorming meeting, almost as a joke," said Colby Remund, Chief Creative Officer at Relic. "But once the initial idea started forming and the names of \'Vern\' and \'Al\' were thrown out, it snowballed into today\'s campaign. We actually just recently launched the second chapter of Vern and Al\'s story."', "Over 13,000 entries from all 50 states and numerous countries competed in the Telly Awards, and more than 3,600 nominations from organizations of all sizes and virtually every industry were submitted this year for consideration in the Stevie Awards.", "In January 2017, The Origin of Adventure content marketing campaign won a local SAMY Award from Utah Business Magazine for its children's book— a short story depicting the same plot as the 30-second video.", 'Watch the "Origin of Adventure" on YouTube: https://www.youtube.com/watch?v=Ycx_IQ3fSqo']
                }, {
                    title: "#Stayward Campaign powers up Utah ad agency joins forces with Garrett Jones",
                    date: "May 10, 2017",
                    content: ["As current Jazz player Gordon Hayward makes the imminent decision to leave or stay, Utah fans are making their opinion heard. Garrett Jones, a super fan from Heber City, Utah has not only raised over $6,000 through a GoFundMe for his #stayward campaign, but has now secured eight more billboards along I-15 in Utah.", '“Fans bring so much energy to the sport, and Utah fans are some of the most determined,” Jones said. “After the success of our GoFundMe, I knew I had the manpower behind me to make an impact. I decided to use the funds we earned expand our reach in Utah.”', "Jones reached out to Adam Stoker, the president and CEO of Relic— also a longtime Jazz fan—who jumped at the chance to get involved.", '“Keeping Hayward with the Jazz is not only important for the general community, but for the business community as well,” Stoker said. “The Jazz bring so much value to businesses who surround themselves with the team and with the arena.”', "The agency, based in Provo, Utah, will provide creative services for the eight billboards along I-15 from Centerville to Murray.", "Jones was able to use the money raised on GoFundMe to secure a prominent billboard owned by the company Yesco to feature new art promoting #stayward. In addition to the Yesco board, Relic partnered with Compass, another billboard company, to utilize the ad space on seven additional boards.", '“I\'m thrilled at the response the campaign has had so far,” Jones said, “I\'m beyond excited to see the buzz Relic will bring to the table. When it comes down to it, we want to show Hayward how much his fans really care. None of this would be happening if the Jazz community didn\'t rally together.”', "After fees and billboard costs, Jones will donate all additional funds—a total of over $900—to the Leukemia and Lymphoma Society to support Erik Fromm’s fundraising page. Fromm is Hayward’s friend and former teammate who created the page in honor of his father and a friend.  Hayward has supported and tweeted about the page in the past.", "Jones, whose name is now very familiar name within the Jazz community, has also launched a social media campaign, encouraging fans to upload videos of themselves explaining why they hope Hayward will choose to stay. Fans can participate by uploading their video on Facebook, Twitter or Instagram and using the hashtag #stayward.", '“Cheering on the Jazz is a tradition in the Utah community,” Stoker said. “With Hayward on the team, the excitement surrounding our team has come back.”']
                }, {
                    title: "Utah Valley Ad Agency, Relic, wins four Communicator Awards for tourism work",
                    subtitle: "The awards are for campaigns in collaboration with three Utah tourism offices",
                    content: []
                }]

            },
            latestNews: {},
            awards: {}
        };
    });
})();
'use strict';

(function () {
            angular.module('app').controller('numetricCtrl', function ($scope, mainService) {

                        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

                        var backgroundPic = document.getElementById('numetric-background');

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
    angular.module('app').controller('servicesCtrl', function ($scope, $sce, $stateParams, $location, $anchorScroll, mainService) {

        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

        console.log($stateParams.num);

        $scope.content = $stateParams.num;

        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };

        var lastAccordion = "";
        var lastTopSec = null;
        var backgroundPic = document.getElementById('services-background');
        var tl = new TimelineMax();

        $scope.changeContent = function (num) {

            $scope.content = num;

            if (lastTopSec === null) {
                tl.to(document.getElementById('services-top-overlay-' + num), 0.05, {
                    height: 0
                }).to(document.getElementById('top-two-sec-' + num), 0.05, {
                    backgroundColor: "white"
                });
            }

            if (lastTopSec !== null && lastTopSec !== num) {

                tl.to(document.getElementById('services-top-overlay-' + num), 0.05, {
                    height: 0
                }).to(document.getElementById('services-top-overlay-' + lastTopSec), 0.05, {
                    height: "100%"
                }, "-=0.05").to(document.getElementById('top-two-sec-' + num), 0.05, {
                    backgroundColor: "white"
                }).to(document.getElementById('top-two-sec-' + lastTopSec), 0.05, {
                    backgroundColor: "transparent"
                }, "-=0.05");
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

            TweenMax.to(document.getElementById('accordion-pop-' + num), 0.15, {
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

        $scope.clientWork = $sce.trustAsHtml('<span>Graphic design is the backbone for any creative work. But like your parents taught you, “Actions speak louder than words,” and we at Relic think that our graphics speak fairly loud. Check out our design portfolio from our <a class="services-work-link" href="/#!/work">client work</a>.</span>');
        $scope.blankClientWork = $sce.trustAsHtml('<span></span>');
        var incr = true;

        $scope.checkForLink = function (sec) {

            if (sec.title === "Graphic Design" && incr === true) {
                document.getElementById('accordion-text-four').innerHTML = $scope.clientWork;
                incr = !incr;
                return 0;
            }if (sec.title === "Graphic Design" && incr === false) {
                document.getElementById('accordion-text-four').innerHTML = $scope.blankClientWork;
                incr = !incr;
                return 0;
            }if (sec.title !== "Graphic Design" && incr === true) {
                document.getElementById('accordion-text-four').innerHTML = $scope.blankClientWork;
                incr = true;
                return 0;
            }if (sec.title !== "Graphic Design" && incr === false) {
                document.getElementById('accordion-text-four').innerHTML = $scope.blankClientWork;
                incr = true;
                return 0;
            }
        };

        $scope.checkForLinkMobile = function (sec) {

            document.getElementById('accordion-text-mobile-four').innerHTML = $scope.clientWork;
        };

        $scope.services = [{
            title: 'Traditional Media',
            intro: "There are certain things in life that are risky. Asking out that girl you’ve been eyeing across the room? Risky. Looking into a new investment? Risky. The movie Risky Business? Ironically, not that risky. However, traditional media and media buying should never have you on the edge of your seat. Relic has media buying experts who focus on negotiating and planning to guarantee the highest return for each client.",
            sections: [{ number: "one", title: "TV", info: ["We’ve noticed a myth going around. No, not that one about Steve in accounting and his weirdly large left foot – a myth about TV spots. Some people are led to believe that TV advertisements have been completely supplanted by digital marketing, but that’s not the case. There is strength in a good TV spot, and Relic’s media team ensures that your TV ads are presented to the correct demographics to leave a lasting impact on your audience."] }, { number: "two", title: "Radio", info: ["Did you know that it’s scientifically proven that everybody listens to music? Everyone. You know that person you’re thinking of who may not listen to music? Nope, they do too. The fact that everyone loves music means radio spots bring tremendous advertising value. A radio ad is wonderful because it is exactly like a shotgun Vegas wedding – cost effective, time efficient, and it leaves a trail of measurable results."] }, { number: "three", title: "Print/Newspaper", info: ["Much like Apple products, print ads and newspapers have been permeating our lives for as long as we can remember, and these items are not leaving any time soon. There’s a good reason for it, too. Print advertising offers certain advantages that create tangible and distinct results. Printed ads in magazines target niche markets, while newspapers target regional audiences. Loyal readership provides a sense of trust that can be used to your advantage. Relic’s media team finds the perfect publications for your ads and delivers measurable results on them."] }, { number: "four", title: "Outdoor Advertising", info: ["Imagine the cool breeze running through your hair, the sounds of nature in your ears, the beautiful smell of exhaust—there’s nothing quite like the great outdoors. Turns out, it’s also a great place to advertise. Relic’s team has been working with unique, distinguishable outdoor advertising for years. We know exactly what it takes to ensure the best results for your campaign. From roadside billboards to public transit banners, Relic delivers the best placement for your ads to ensure you have the greatest reach, the best ROI and drive the most engagement with your products."] }, { number: "five", title: "Direct Mail", info: ["Direct mail offers the opportunity to personally connect with an audience in an original way that sets you apart from the competition. The key to building any relationship with a customer is communicating a clear message and making it personal. Studies found that once a direct mail piece is opened, the recipient is more likely to engage with the company. Relic’s team has seen remarkable success with our direct mail pieces. In fact, I’m currently recruiting Relic to send out direct mail pieces to potential dating partners. Stay tuned for an update. (Update: apparently I’m married and my wife was not happy with what turned up in our mail today. Though it did intrigue her enough to open it)."] }, { number: "six", title: "Sponsorships", info: ["Sponsorship advertising is a great way to build up a reputable brand image for your company. Sponsoring a local event will insert your brand name in the forefront of the minds of the public. Additionally, sponsorships can build priceless PR value. Being a part of these sponsored events will show the positive impact you have on your community. The hardest part of sponsorships is finding the best events to be a part of, and Relic’s team knows the exact information your audience will want to see. Always keep in mind the importance of relevance. There’s a reason you never see events such as the “Nike Hotdog Eating Contest.”"] }]
        }, {
            title: 'Creative',
            intro: "Do you remember the last advertisement you saw? Creating a message that resonates can be difficult. Our creative team specializes in delivering unforgettable campaigns, content and designs. Good creative should communicate the same message as when you meet your in-laws for the first time−a strong, memorable directive that leaves just enough of an impact that you’ll linger in the back of their minds. It’s a tough balance, but we’ll work with you to ensure that we deliver creative that knocks your customers’ weirdly colorful socks off.",
            sections: [{ number: "one", title: "Creative Strategy", info: ["Any successful company, brand or campaign has a creative strategy behind it. Believe it or not, this is actually not decided by blindly throwing darts in the Museum of Modern Art and seeing what we hit. It consists of detailed market research, a strategic plan and an effective delivery. The creative team at Relic provides top-of-the-line design from our best and brightest minds, ensuring that your campaign delivers the best results."] }, { number: "two", title: "Campaign Development", info: ["From conception to execution, the creative development of a campaign will shape the future of your company. At Relic, we believe that collaboration and attentiveness are the tenets to any successful campaign. While we work with you to develop the correct strategy, we will combine your vision with our renowned creative expertise. As all the pieces of our jigsaw puzzle of ideas come together, that’s when you’ll see the sparks fly. In a good way. Nothing is on fire, don’t worry."] }, { number: "three", title: "Branding", info: ["Every brand has a story to tell. The creative techniques behind branding will reflect the message you convey to the public. Why do certain brands stick with you? Why are you loyal to certain brands but not others? The answer is simple. In today’s content-driven society, a compellingly crafted story will do more for your bottom line than ads. But if you’ve ever been in a job interview, you know that sometimes it’s hard to recognize what sets you apart. Let Relic highlight your company’s unique qualities. You have a story worth telling; let us share it."] }, { number: "four", title: "Graphic Design", info: ["something"] }, { number: "five", title: "TV/Radio Production", info: ["When the radio was invented in 1895, Guglielmo Marconi was quoted saying that he couldn’t wait for Relic to take full advantage of his invention (don’t fact check us on that). The flattery paid off, and now Relic is producing many TV and radio spots every year. Specifically targeted TV and radio ads are still tremendously valuable today, and Relic has the production process down."] }, { number: "six", title: "Web Design/Development", info: ["Relic also offers website design and development services. From complete web overhaul to slight, but important, adjustments, our web team will prove to be invaluable. We’ll take your website from the lame Neville Longbottom in the first Harry Potter to the snake-slaying hero from the last movie.]"] }]
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

        $scope.servicesMobile = function (num) {

            var mobileExpand = document.getElementById('services-mobile-expand-' + num),
                mobileExpandLast = document.getElementById('services-mobile-expand-' + $scope.lastNum),
                arrow = document.getElementById('mobile-expand-arrow-' + num),
                lastArrow = document.getElementById('mobile-expand-arrow-' + $scope.lastNum),
                mobileInnerExpand = document.getElementById('services-mobile-expand-' + num).getElementsByTagName('mobile-inner-expand'),
                mobileInnerExpandLast = document.getElementById('services-mobile-expand-' + $scope.lastNum).getElementsByTagName('mobile-inner-expand');

            if (mobileExpand.style.height === "auto" && num === $scope.lastNum) {

                TweenMax.to(mobileExpand, 0, {
                    display: "none",
                    fontSize: 0
                });
                TweenMax.to(mobileExpand, 0.5, {
                    height: 0
                });
                TweenMax.to(mobileInnerExpand, 0.5, {
                    display: "none"
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
                    display: "none",
                    height: 0,
                    fontSize: 0
                });
                TweenMax.to(mobileInnerExpandLast, 0.5, {
                    display: "none"
                });

                TweenMax.to(mobileExpand, 0.5, {
                    height: "auto",
                    color: "#161616",
                    fontSize: "inherit",
                    display: "flex"
                });
                TweenMax.to(mobileInnerExpand, 0.5, {
                    display: "flex"
                });
                TweenMax.to(arrow, 0.75, {
                    transform: "rotateX(180deg)"
                });

                $scope.lastNum = num;

                return;
            }

            TweenMax.to(mobileExpand, 0.5, {
                height: "auto",
                color: "#161616",
                fontSize: "inherit",
                display: "flex"
            });
            TweenMax.to(mobileInnerExpand, 0.5, {
                display: "flex"
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

        $scope.readMore = function () {

            if (window.innerWidth <= 768) {

                TweenMax.to(document.getElementById('telecom-more-info'), 0.25, {
                    position: "relative",
                    visibility: "visible",
                    margin: "0 0 100px 0"
                });
                TweenMax.to(document.getElementById('telecom-read-more'), 0.25, {
                    visibility: "hidden"
                });
                TweenMax.to(document.getElementById('telecom-industry-info'), 0.25, {
                    margin: "0 0 0 0"
                });
            }

            if (window.innerWidth > 768) {

                TweenMax.to(document.getElementById('telecom-more-info'), 0.25, {
                    position: "relative",
                    visibility: "visible",
                    margin: "0 0 100px 0"
                });
                TweenMax.to(document.getElementById('telecom-read-more'), 0.25, {
                    visibility: "hidden"
                });
                TweenMax.to(document.getElementById('telecom-industry-info'), 0.25, {
                    margin: "100px 0 0 0"
                });
            }
        };

        $scope.readLess = function () {

            if (window.innerWidth <= 768) {
                TweenMax.to(document.getElementById('telecom-more-info'), 0.25, {
                    position: "absolute",
                    visibility: "hidden",
                    margin: "0 0 0 0"
                });
                TweenMax.to(document.getElementById('telecom-read-more'), 0.25, {
                    visibility: "visible"
                });
                TweenMax.to(document.getElementById('telecom-industry-info'), 0.25, {
                    margin: "0 0 100px 0"
                });

                window.scrollTo(0, 0);
            }

            if (window.innerWidth > 768) {
                TweenMax.to(document.getElementById('telecom-more-info'), 0.25, {
                    position: "absolute",
                    visibility: "hidden",
                    margin: "0 0 0 0"
                });
                TweenMax.to(document.getElementById('telecom-read-more'), 0.25, {
                    visibility: "visible"
                });
                TweenMax.to(document.getElementById('telecom-industry-info'), 0.25, {
                    margin: "100px 0 100px 0"
                });
                window.scrollTo(0, 0);
            }
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

        $scope.readMore = function () {

            if (window.innerWidth <= 768) {

                TweenMax.to(document.getElementById('tourism-more-info'), 0.25, {
                    position: "relative",
                    visibility: "visible",
                    margin: "0 0 100px 0"
                });
                TweenMax.to(document.getElementById('tourism-read-more'), 0.25, {
                    visibility: "hidden"
                });
                TweenMax.to(document.getElementById('tourism-industry-info'), 0.25, {
                    margin: "0 0 0 0"
                });
            }

            if (window.innerWidth > 768) {

                TweenMax.to(document.getElementById('tourism-more-info'), 0.25, {
                    position: "relative",
                    visibility: "visible",
                    margin: "0 0 100px 0"
                });
                TweenMax.to(document.getElementById('tourism-read-more'), 0.25, {
                    visibility: "hidden"
                });
                TweenMax.to(document.getElementById('tourism-industry-info'), 0.25, {
                    margin: "100px 0 0 0"
                });
            }
        };

        $scope.readLess = function () {

            if (window.innerWidth <= 768) {
                TweenMax.to(document.getElementById('tourism-more-info'), 0.25, {
                    position: "absolute",
                    visibility: "hidden",
                    margin: "0 0 0 0"
                });
                TweenMax.to(document.getElementById('tourism-read-more'), 0.25, {
                    visibility: "visible"
                });
                TweenMax.to(document.getElementById('tourism-industry-info'), 0.25, {
                    margin: "0 0 100px 0"
                });

                window.scrollTo(0, 0);
            }

            if (window.innerWidth > 768) {
                TweenMax.to(document.getElementById('tourism-more-info'), 0.25, {
                    position: "absolute",
                    visibility: "hidden",
                    margin: "0 0 0 0"
                });
                TweenMax.to(document.getElementById('tourism-read-more'), 0.25, {
                    visibility: "visible"
                });
                TweenMax.to(document.getElementById('tourism-industry-info'), 0.25, {
                    margin: "100px 0 100px 0"
                });
                window.scrollTo(0, 0);
            }
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

(function () {
    angular.module('app').controller('workCtrl', function ($scope, mainService) {

        var backgroundPic = document.getElementById('work-background');

        window.onscroll = function () {
            var offSet = window.pageYOffset,
                csParaStart = offSet * 0.75;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic, csParaStart);
        };

        //This is the animations for the work sections
        $scope.workEnter = function (num) {
            TweenMax.to(document.getElementById('work-content-image-' + num), 0.40, {
                opacity: 0
            });
        };

        $scope.workLeave = function (num) {
            TweenMax.to(document.getElementById('work-content-image-' + num), 0.40, {
                opacity: 1
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
    angular.module('app').controller('getStartedCtrl', function ($scope, $state, $timeout, mainService, vcRecaptchaService) {

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

            if (window.innerWidth < 426) {
                $state.go('contact');
                return;
            }

            var tl = new TimelineMax();
            tl.to(mainPop, 0.5, { ease: Power2.easeIn, left: 0 }).to(barFive, 0.15, { left: 0 }, "+=0.5").to(barSix, 0.15, { right: 0 }).to(barSeven, 0.15, { left: 0 }).to(barSix, 0.15, { left: "101%" }, "-=0.15");
        };

        $scope.ctaHide = function () {
            var tl = new TimelineMax();
            tl.to(barSeven, 0.15, { left: "101%" }).to(barSix, 0.15, { left: 0 }, "-=0.15").to(barFive, 0.15, { left: "101%" }).to(barSix, 0.15, { left: '-100%' }, "-=0.15").to(mainPop, 0.5, { ease: Power2.easeIn, left: "-101%" });
        };

        $scope.response = null;
        $scope.widgetId = null;
        $scope.model = {
            key: '6LfjNi0UAAAAABBsQ1W4gywWWmj8ZM5re4bf5Gcz'
        };
        $scope.setResponse = function (response) {
            console.info('Response available');
            $scope.response = response;
        };
        $scope.setWidgetId = function (widgetId) {
            console.info('Created widget ID: %s', widgetId);
            $scope.widgetId = widgetId;
        };
        $scope.cbExpiration = function () {
            console.info('Captcha expired. Resetting response object');
            vcRecaptchaService.reload($scope.widgetId);
            $scope.response = null;
        };

        $scope.contactRelic = function (contact) {

            console.log('sending the captcha response to the server', $scope.response);

            mainService.verifyCaptcha($scope.response).then(function (res) {

                console.log(res.data.success);

                if (res.data.success) {

                    console.log('Google has verified the user.');

                    mainService.contactRelic(contact).then(function (response) {
                        console.log(response);
                        if (response.status === 200) {
                            $scope.formStatus = "Awesome!  Looks like your message went through.  We\'ll be in touch with you as soon as possible.";
                            TweenMax.to(document.getElementById('get-started-form-status-message'), 0.15, {
                                display: "flex",
                                ease: Power2.easeIn
                            });
                        }
                    });
                }if (!res.data.success) {
                    console.log('Failed validation');
                    // In case of a failed validation you need to reload the captcha
                    // because each response can be checked just once
                    vcRecaptchaService.reload($scope.widgetId);
                    alert('Sorry, we couldn\'t verify you, please try again.');
                }
            });
        };

        $scope.exitFormStatus = function (contact) {

            TweenMax.to(document.getElementById('get-started-form-status-message'), 0.15, {
                display: "none",
                ease: Power2.easeOut
            });

            for (var i in contact) {
                contact[i] = null;
            }
            vcRecaptchaService.reload($scope.widgetId);
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

(function () {
    angular.module('app').controller('mobileNavCtrl', function ($scope, mainService) {

        var tl = new TimelineMax(),
            mobileNav = document.getElementById('mobile-nav-popup'),
            trigger = true,
            hb1 = document.getElementById('ham-one'),
            hb2 = document.getElementById('ham-two'),
            hb3 = document.getElementById('ham-three'),
            hb4 = document.getElementById('ham-four'),
            hb5 = document.getElementById('ham-five');

        $scope.exitNav = function (section) {
            if (trigger) {
                tl.to(hb1, 0.1, { opacity: 0 }).to(hb2, 0.1, { opacity: 0 }, "-=0.1").to(hb3, 0.1, { opacity: 0 }, "-=0.2").to(hb4, 0.15, { rotation: -45 }).to(hb5, 0.15, { rotation: 45 }, "-=0.15").to(mobileNav, 0.25, { right: 0, ease: Power3.easeIn }, "-=0.15").to(hb4, 0.5, { backgroundColor: "black" }, "-=0.15").to(hb5, 0.5, { backgroundColor: "black" }, "-=0.5").to(hb1, 0.1, { top: "10px" }).to(hb3, 0.1, { bottom: "10px" }, "-=0.1");
                trigger = false;
            } else if (!trigger) {
                tl.to(hb4, 0.1, { opacity: 0, backgroundColor: "white" }).to(hb5, 0.1, { opacity: 0, backgroundColor: "white" }, "-=0.1").to(hb2, 0.1, { opacity: 1, backgroundColor: "white" }).to(hb1, 0.1, { opacity: 1, top: 0, backgroundColor: "white" }).to(hb3, 0.1, { opacity: 1, bottom: 0, backgroundColor: "white" }, "-=0.1").to(mobileNav, 0.25, { right: "-101%", ease: Power2.easeOut }, "-=0.2").to(hb4, 0.01, { rotation: 0 }).to(hb5, 0.01, { rotation: 0 }).to(hb4, 0.01, { opacity: 1 }).to(hb5, 0.01, { opacity: 1 });
                trigger = true;
            }
        };
    });
})();

// /**
//  * Created by Seth on 8/30/2017.
//  */
// (function(){
//     angular.module('app').controller('mobileNavCtrl', function($scope, mainService){
//
//         let tl = new TimelineMax(),
//             mobileNav = document.getElementById('mobile-nav-popup'),
//             trigger = true,
//             hamburgerOne = document.getElementById('hamburger-one'),
//             hamburgerTwo = document.getElementById('hamburger-two'),
//             hamburgerThree = document.getElementById('hamburger-three');
//
//
//
//
//
//             $scope.exitNav = function(section){
//
//                 if( section !== "dont" ) {
//                     TweenMax.to(document.getElementById('mobile-nav-section-' + section), 0.05, {
//                         backgroundColor: "rgba(255,255,255,1)",
//                         ease: Power2.easeIn
//                     });
//                 }
//
//             if(trigger){
//                   tl.to(hamburgerTwo, 0.08, {top: "44%", backgroundColor: "#262626"})
//                     .to(hamburgerOne, 0.08, {top: "47%", backgroundColor: "#262626"})
//                     .to(hamburgerThree, 0.08, {top: "47%", backgroundColor: "#262626"})
//                     .to(hamburgerOne, 0, { opacity: 0})
//                     .to(hamburgerThree, 0.08, {transform: "rotate(45deg)"})
//                     .to(hamburgerTwo, 0.08, {transform: "rotate(-45deg)"})
//                     .to(mobileNav, 0.15, {right: 0, ease: Power2.easeIn});
//             } if(!trigger && section !== "dont") {
//                       tl.to(hamburgerThree, 0.08, {transform: "rotate(0deg)"})
//                         .to(hamburgerTwo, 0.08, {transform: "rotate(0deg)"})
//                         .to(hamburgerThree, 0.08, { top: "86%", backgroundColor: "white"})
//                         .to(hamburgerOne, 0.08, { opacity: 1, top: 0, backgroundColor: "white"})
//                         .to(hamburgerTwo, 0.08, { top: "45%", backgroundColor: "white"})
//                         .to(mobileNav, 0.15, {right: "-101%", ease: Power2.easeOut})
//                         .to(document.getElementById('mobile-nav-section-' + section), 0, {backgroundColor: "transparent"});
//             } if(!trigger) {
//                     tl.to(hamburgerThree, 0.08, {transform: "rotate(0deg)"})
//                         .to(hamburgerTwo, 0.08, {transform: "rotate(0deg)"})
//                         .to(hamburgerThree, 0.08, { top: "86%", backgroundColor: "white"})
//                         .to(hamburgerOne, 0.08, { opacity: 1, top: 0, backgroundColor: "white"})
//                         .to(hamburgerTwo, 0.08, { top: "44%", backgroundColor: "white"})
//                         .to(mobileNav, 0.15, {right: "-101%", ease: Power2.easeOut});
//                 }
//
//             trigger = !trigger;
//         };
//
//
//     })
// })();
'use strict';

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
                backgroundColor: "rgba(255,255,255,1)"
            });
        };

        $scope.dropDownHoverLeave = function (num) {
            TweenMax.to(document.getElementById('drop-down-item-' + num), 0.15, {
                backgroundColor: "rgba(255,255,255,0.8)",
                color: "#242424"
            });
        };

        $scope.getStarted = function () {
            mainService.navGetStarted();
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
