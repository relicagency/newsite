
(function(){
    angular.module('app')
        .controller('workCtrl', function($scope, mainService){

            let backgroundPic = document.getElementById('tecch-background');

            window.onscroll = function() {
                let offSet = window.pageYOffset,
                    csParaStart = offSet * 0.75;

                mainService.navBackground(offSet);
                mainService.parallaxIt(backgroundPic,csParaStart);
            };

            //This is the animations for the work sections
            $scope.workEnter = function(){
                let overlay = event.currentTarget.children[0];
                TweenMax.to(overlay, 0.25, {opacity: 0});
            };
            $scope.workLeave = function() {
                let overlay = event.currentTarget.children[0];
                TweenMax.to(overlay, 0.25, {opacity: 1})
            }
        })
})();