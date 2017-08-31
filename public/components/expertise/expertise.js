(function(){
  angular.module('app')
  .controller('expertiseCtrl', function($scope){

    $scope.expertCoolize = function(num) {

      let expertise = document.getElementById('expertise-content-' + num);

        console.log(expertise);

      TweenMax.fromTo(expertise, 1, {
        height: "2px",
          color: "transparent"
      }, {
        height: "calc(100vw / 6)",
          backgroundColor: "rgba(255,255,255,0.8)"
      });

    }

  })
})();