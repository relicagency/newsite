/**
 * Created by Seth on 8/21/2017.
 */
(function(){
    angular.module('app')
        .controller('workShowCtrl', function($scope, $stateParams, $state, mainService){

             $scope.client = mainService.clients[$stateParams.client];

             if($scope.client.intro === ""){
                 TweenMax.to(document.getElementById('client-content-intro'), 0, {
                     display: "none"
                 })
             }
             if($scope.client.stats === "") {
                 TweenMax.to(document.getElementById('client-stats-container'), 0, {
                     display: "none"
                 })
             }
             if(!$scope.client.video){
                 TweenMax.to(document.getElementById('client-video-container'), 0, {
                     display: "none"
                 })
             }



               let backgroundPic = document.getElementById('tds-background');

            window.onscroll = function() {
                let offSet = window.pageYOffset,
                    csParaStart = offSet * 0.75;

                mainService.navBackground(offSet);
                mainService.parallaxIt(backgroundPic,csParaStart);
            };

        })
})();