/**
 * Created by Seth on 8/9/2017.
 */
(function(){

    angular.module('app')
        .directive('footerDir', function(){
            return {
                restrict: 'E',
                templateUrl: './directives/footer/footer.html',
                controller: 'footerCtrl'
            }
        })

})();