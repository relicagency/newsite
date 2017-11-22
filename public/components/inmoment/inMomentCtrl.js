(function(){
    angular.module('app')
        .controller('inMomentCtrl', function($scope, mainService){

            $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

            let backgroundPic = document.getElementById('inmoment-background');

            window.onscroll = function() {
                let offSet = window.pageYOffset,
                    csParaStart = offSet * 0.75;

                mainService.navBackground(offSet);
                mainService.parallaxIt(backgroundPic,csParaStart);
            };


        })
})();