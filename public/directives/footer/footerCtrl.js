(function(){
    angular.module('app')
        .controller('footerCtrl', function($scope){

            $scope.footerSocialHover = function(social){
                TweenMax.fromTo(document.getElementById('footer-social-' + social), 1, { height: "40px", width: "40px"}, {height: "35px", width: "35px"})
            }

        })
})();