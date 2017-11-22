
(function(){
    angular.module('app')
        .controller('workCtrl', function($scope, mainService){

            let backgroundPic = document.getElementById('work-background');

            window.onscroll = function() {
                let offSet = window.pageYOffset,
                    csParaStart = offSet * 0.75;

                mainService.navBackground(offSet);
                mainService.parallaxIt(backgroundPic,csParaStart);
            };

            //This is the animations for the work sections
            $scope.workEnter = function(num){
                TweenMax.to(document.getElementById('work-content-image-' + num), 0.40, {
                            opacity: 0
                    });
            };

            $scope.workLeave = function(num) {
                TweenMax.to(document.getElementById('work-content-image-' + num), 0.40, {
                    opacity: 1
                })
            }

        })
})();