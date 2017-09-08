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

        })
})();