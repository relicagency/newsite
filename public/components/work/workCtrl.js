/**
 * Created by Seth on 8/21/2017.
 */
(function(){
    angular.module('app')
        .controller('workCtrl', function($scope, mainService){

            $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

            window.onscroll = function() {
                let offSet = window.pageYOffset;

                mainService.navBackground(offSet);

            };

            //This is the animations for the work sections
            $scope.workEnter = function(num){
                TweenMax.to(document.getElementById('work-content-image-' + num), 0.75, {
                            filter: "blur(8px)",
                            opacity: 0
                    });
            };

            $scope.workLeave = function(num){
                TweenMax.to(document.getElementById('work-content-image-' + num), 0.5, {
                    opacity: 1,
                    filter: "blur(0)"
                })
            }

        })
})();