(function(){
  angular.module('app')
  .controller('expertiseCtrl', function($scope, mainService){

      $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

      window.onscroll = function() {
          let offSet = window.pageYOffset;

          mainService.navBackground(offSet);

      };

  })
})();