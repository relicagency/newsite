(function(){
  angular.module('app')
  .controller('expertiseCtrl', function($scope, mainService){

      window.onscroll = function() {
          let offSet = window.pageYOffset;

          mainService.navBackground(offSet);

      };

  })
})();