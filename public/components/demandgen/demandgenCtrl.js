/**
 * Created by Seth on 8/22/2017.
 */
(function(){
    angular.module('app')
        .controller('demandgenCtrl', function($scope, mainService){
            
            let backgroundPic = document.getElementById('demandgen-background');

            window.onscroll = function() {
                let offSet = window.pageYOffset,
                    csParaStart = offSet * 0.5050505050505050;

                mainService.navBackground(offSet);
                mainService.parallaxIt(backgroundPic,csParaStart);
            };

        })
})();