(function(){
    angular.module('app')
        .controller('techCtrl', function($scope, mainService){

            let backgroundPic = document.getElementById('tech-background');

            window.onscroll = function() {
                let offSet = window.pageYOffset,
                    csParaStart = offSet * 0.75;

                mainService.navBackground(offSet);
                mainService.parallaxIt(backgroundPic,csParaStart);
            };


            $scope.readMore = function () {
                TweenMax.to(document.getElementById('tech-more-info'), 0.25, {position: "relative",visibility: "visible",display: "block"});
                TweenMax.to(document.getElementById('tech-read-more'), 0.25, {visibility: "hidden"});
              }
              $scope.readLess = function () {
                TweenMax.to(document.getElementById('tech-more-info'), 0.25, {position: "absolute",visibility: "hidden"});
                TweenMax.to(document.getElementById('tech-read-more'), 0.25, {visibility: "visible"});
                window.scrollTo(0, 0);
              }
              $scope.workEnter = function(){
                let overlay = event.currentTarget.children[0];
                TweenMax.to(overlay, 0.25, {opacity: 0});
              }
              $scope.workLeave = function() {
                  let overlay = event.currentTarget.children[0];
                  TweenMax.to(overlay, 0.25, {opacity: 1})
              }

        })
})();