/**
 * Created by Seth on 8/21/2017.
 */
(function(){
    angular.module('app')
        .controller('workCtrl', function($scope, mainService){

            window.onscroll = function() {
                let offSet = window.pageYOffset;

                mainService.navBackground(offSet);

            };

            //This is the animations for the work sections
            $scope.workEnter = function(num){
                TweenMax.to(document.getElementById('work-content-overlay-' + num), 0.25, {
                            width: "100%"
                    })
            };

            $scope.workLeave = function(num){
                TweenMax.to(document.getElementById('work-content-overlay-' + num), 0.25, {
                    width: 0
                })
            }

        })
})();