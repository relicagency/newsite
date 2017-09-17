/**
 * Created by Seth on 8/21/2017.
 */
(function(){
    angular.module('app')
        .controller('usCtrl', function($scope, mainService){

            let backgroundPic = document.getElementById('us-background');

            window.onscroll = function() {
                let offSet = window.pageYOffset,
                    csParaStart = offSet * 0.75;

                mainService.navBackground(offSet);
                mainService.parallaxIt(backgroundPic,csParaStart);
            };


        })
})();