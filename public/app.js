(function(){
  angular
  // .module('app', ['ui.router', 'auth0','angular-auth0', 'vcRecaptcha'])
  .module('app', ['ui.router', 'vcRecaptcha'])
      .run(['$rootScope', '$window', scrollFix])
  //.config(['$stateProvider', '$urlRouterProvider', 'angularAuth0Provider', config]);
  .config(['$stateProvider', '$urlRouterProvider', config]);


  //function config($stateProvider, $urlRouterProvider, angularAuth0Provider, $locationProvider){
  function config($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/home',
        controller:'homeCtrl',
        templateUrl: './components/home/home.html'
      })
      .state('expertise', {
        url: '/expertise',
        controller: 'expertiseCtrl',
        templateUrl: './components/expertise/expertise.html'
      })
      .state('services', {
        url: '/services/:num',
          controller: 'servicesCtrl',
          templateUrl: './components/services/services.html'
      })
      .state('contact', {
        url: '/contact',
          controller: 'contactCtrl',
          templateUrl: './components/contact/contact.html'
      })
      .state('about', {
        url: '/about',
          controller: 'aboutCtrl',
          templateUrl: './components/about/about.html'
      })
      .state('tourism', {
        url: '/expertise/tourism',
          controller: 'tourismCtrl',
          templateUrl: './components/tourism/tourism.html'
      })
      .state('telecom', {
        url: '/expertise/telecom',
          controller: 'telecomCtrl',
          templateUrl: './components/telecom/telecom.html'
      })
      .state('tech', {
        url: '/expertise/tech',
          controller: 'techCtrl',
          templateUrl: './components/tech/tech.html'
      })
      .state('demandgen', {
        url: '/expertise/demandgen',
          controller: 'demandgenCtrl',
          templateUrl: './components/demandgen/demandgen.html'
      })
      .state('newsroom', {
          url: '/newsroom',
          controller: 'newsroomCtrl',
          templateUrl: './components/newsroom/newsroom.html'
      })
      .state('work', {
        url: '/work',
          controller: 'workCtrl',
          templateUrl: './components/work/work.html'
      })
      .state('tds', {
        url: '/work/tds',
          controller: 'tdsCtrl',
          templateUrl: './components/tds/tds.html'
      })
      .state('garfield', {
        url: "/work/garfield",
        controller: 'garfieldCtrl',
          templateUrl: './components/garfield/garfield.html'
      })
      .state('tuacahn', {
        url: "/work/tuacahn",
          controller: 'tuacCtrl',
          templateUrl: './components/tuacahn/tuacahn.html'
      })
      .state('uintah', {
        url: "/work/uintah",
          controller: 'uintahCtrl',
          templateUrl: './components/uintah/uintah.html'
      })
      .state('uvhba', {
        url: "/work/uvhba",
          controller: 'uvhbaCtrl',
          templateUrl: './components/uvhba/uvhba.html'
      })
      .state('maxxsouth', {
        url: "/work/maxxsouth",
          controller: "maxxsouthCtrl",
          templateUrl: "./components/maxxsouth/maxxsouth.html"
      })
      .state('moab', {
        url: "/work/moab",
          controller: 'moabCtrl',
          templateUrl: "./components/moab/moab.html"
      })
      .state('zerorez', {
        url: "/work/zerorez",
          controller: "zerorezCtrl",
          templateUrl: "./components/zerorez/zerorez.html"
      })
      .state('workfront', {
        url: "/work/workfront",
          controller: "wfrontCtrl",
          templateUrl: "./components/workfront/workfront.html"
      })
      .state('us', {
        url: "/work/us",
          controller: "usCtrl",
          templateUrl: "./components/us/us.html"
      })
      .state('brio', {
        url: "/work/brio",
          controller: "brioCtrl",
          templateUrl: "./components/brio/brio.html"
      })
      .state('ccbh', {
        url: "/work/ccbh",
          controller: "ccbhCtrl",
          templateUrl: "./components/ccbh/ccbh.html"
      })
      .state('beehive', {
        url: "/work/beehive",
          controller: "beehiveCtrl",
          templateUrl: "./components/beehive/beehive.html"
      })
      .state('rubys', {
        url: "/work/rubys",
          controller: "rubysCtrl",
          templateUrl: "./components/rubys/rubys.html"
      })
      .state('creef', {
        url: "/work/creef",
          controller: "creefCtrl",
          templateUrl: "./components/creef/creef.html"
      })
      .state('b2scapes', {
        url: "/work/b2scapes",
          controller: "b2Ctrl",
          templateUrl: "./components/b2scapes/b2scapes.html"
      })
      .state('branding', {
        url: "/work/branding",
          controller: "brandingCtrl",
          templateUrl: "./components/branding/branding.html"
      })
      .state('inmoment', {
          url: "/work/inmoment",
          controller: "inMomentCtrl",
          templateUrl: "./components/inmoment/inmoment.html"
      })
      .state('bamboohr', {
          url: "/work/bamboohr",
          controller: "bambooHrCtrl",
          templateUrl: "./components/bamboohr/bamboohr.html"
      })
      .state('jive', {
          url: "/work/jive",
          controller: "jiveCtrl",
          templateUrl: "./components/jive/jive.html"
      })
      .state('numetric', {
          url: "/work/numetric",
          controller: "numetricCtrl",
          templateUrl: "./components/numetric/numetric.html"
      })
      .state('cms', {
          url: "/cms",
          controller: "cmsCtrl",
          templateUrl: "./cms/cms.html"
      });

      // angularAuth0Provider.init({
      //     clientID: 'Gp0QmQXJOrjk2x4-Socon3puBaFUcTEk', // Your Default Client ID
      //     domain: 'relic-agency.auth0.com', // Your Auth0 Domain
      //     responseType: 'token id_token',
      //     redirectUri: AUTH0_CALLBACK_URL, // Your Callback URL
      //     audience: AUTH0_API_AUDIENCE, // The API Identifier value you gave your API
      // }, auth0lock);

      // // Configure a tokenGetter so that the isAuthenticated
      // // method from angular-jwt can be used
      // jwtOptionsProvider.config({
      //     tokenGetter: function() {
      //         return localStorage.getItem('id_token');
      //     }
      // });

    
    $urlRouterProvider
      .otherwise('/home');
  }

    //$locationProvider.hashPrefix('');

  function scrollFix($rootScope, $window){
    $rootScope.$on('$stateChangeSuccess', function(){
      $window.scrollTo(0, 0)
    });
  }

})();
