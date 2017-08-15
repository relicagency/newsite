(function(){

    angular.module('app')
        .directive('homeContentDir', function(){
            return {
                restrict: 'E',
                templateUrl: './directives/home-content/home-content.html',
                controller: 'homeContentCtrl'
            }
        })

})()