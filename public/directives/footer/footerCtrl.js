(function(){
    angular.module('app')
        .controller('footerCtrl', function($scope) {

            $scope.footerSocialHover = function (social) {
                TweenMax.to(document.getElementById('footer-social-' + social), 1, {fill: "white"})
            }



        })
})();