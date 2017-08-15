(function(){

  angular.module('app')
  .directive('navDir', function(){
    return {
      restrict: 'E',
      templateUrl: './directives/nav/navTmpl.html',
      controller: 'navCtrl'
    }
  })

})()