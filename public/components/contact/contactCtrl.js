/**
 * Created by Seth on 8/14/2017.
 */
(function(){
    angular.module('app').controller('contactCtrl', function($scope, mainService){

        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

        let backgroundPic = document.getElementById('contact-background');

        window.onscroll = function() {
            let offSet = window.pageYOffset,
                csParaStart = offSet * 0.5050505050505050;

            // backgroundPic.style.bottom = csParaStart + "px";
            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic,csParaStart);
        };

        $scope.contactRelic = function(contact){
            mainService.contactRelic(contact).then(function(response){
                console.log(response);
            })
        }

    });
})();