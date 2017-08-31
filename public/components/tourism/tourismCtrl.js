/**
 * Created by Seth on 8/17/2017.
 */
(function(){
    angular.module('app')
        .controller('tourismCtrl', function($scope, mainService){

            let backgroundPic = document.getElementById('tourism-background');

            window.onscroll = function() {
                let offSet = window.pageYOffset,
                    csParaStart = offSet * 0.75;

                mainService.navBackground(offSet);
                mainService.parallaxIt(backgroundPic,csParaStart);
            };

        })
})();