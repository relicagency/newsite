(function(){
    angular.module('app').controller('cmsCtrl', function($scope, cmsService){

        let vm = this;
        vm.auth = cmsService;

        $scope.login = function(){
            vm.auth.login();
        }

})

})();