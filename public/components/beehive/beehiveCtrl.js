/**
 * Created by Seth on 8/21/2017.
 */
(function(){
    angular.module('app')
        .controller('beehiveCtrl', function($scope, mainService){

            let backgroundPic = document.getElementById('beehive-background');

            window.onscroll = function() {
                let offSet = window.pageYOffset,
                    csParaStart = offSet * 0.75;

                mainService.navBackground(offSet);
                mainService.parallaxIt(backgroundPic,csParaStart);
            };


        })
})();