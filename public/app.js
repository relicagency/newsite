(function(){
  angular
  .module('app', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', config])
  .run(['$rootScope', '$window', scrollFix])

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
          url: '/services',
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
        });
    
    $urlRouterProvider
      .otherwise('/home')
  }

  function scrollFix($rootScope, $window){
    $rootScope.$on('$stateChangeSuccess', function(){
      $window.scrollTo(0, 0)
    })
  }

})();
