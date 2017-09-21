(function(){
  angular.module('app')
  .controller('homeCtrl', function($scope, mainService){


      let homeMainBack = document.getElementById('home-hero'),
          headlineContent = document.getElementById('headline-content'),
          backgroundGrad = document.getElementById('home-linear-grad');

      window.onscroll = function(){
          let offSet = window.pageYOffset,
              csParaStart = offSet * 0.75;

          mainService.navBackground(offSet);


          if(window.innerWidth > 850){
              headlineContent.style.top = 50 + (csParaStart * 0.0755) + "%";
              backgroundGrad.style.opacity = 0.5 - (csParaStart * 0.004);
          }
          if(window.innerWidth < 425) {
              // headlineContent.style.opacity = 1 - (csParaStart * 0.0085);
              headlineContent.style.top = headlineContent.style.top - 50 + "%";
              backgroundGrad.style.opacity = 0.5 - (csParaStart * 0.8);
          }
          if(window.innerWidth < 851){
              headlineContent.style.opacity = 1 - (csParaStart * 0.0025);
              headlineContent.style.top = 50 + (csParaStart * 0.15) + "%";
              backgroundGrad.style.opacity = 0.5 - (csParaStart * 0.4);
          }




          if(window.innerWidth > 1400) {
              homeMainBack.style.backgroundPositionY = -281 + csParaStart + 'px';
          } if(window.innerWidth < 1400 && window.innerWidth > 1100){
              homeMainBack.style.backgroundPositionY = -124 + csParaStart + 'px';
          }  if(window.innerWidth < 1100 && window.innerWidth > 850){
              homeMainBack.style.backgroundPositionY = -50 + csParaStart + 'px';
          } if(window.innerWidth < 850){
              homeMainBack.style.backgroundPositionY = -50 + csParaStart + 'px';
          }
      };


  })
})();