/**
 * Created by Seth on 8/14/2017.
 */
(function(){
    angular.module('app').controller('contactCtrl', function($scope, mainService, vcRecaptchaService){



        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

        let backgroundPic = document.getElementById('contact-background');

        window.onscroll = function() {
            let offSet = window.pageYOffset,
                csParaStart = offSet * 0.5050505050505050;

            // backgroundPic.style.bottom = csParaStart + "px";
            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic,csParaStart);
        };



        $scope.response = null;
        $scope.widgetId = null;
        $scope.model = {
            key: '6LfjNi0UAAAAABBsQ1W4gywWWmj8ZM5re4bf5Gcz'
        };
        $scope.setResponse = function (response) {
            console.info('Response available');
            $scope.response = response;
        };
        $scope.setWidgetId = function (widgetId) {
            console.info('Created widget ID: %s', widgetId);
            $scope.widgetId = widgetId;
        };
        $scope.cbExpiration = function() {
            console.info('Captcha expired. Resetting response object');
            vcRecaptchaService.reload($scope.widgetId);
            $scope.response = null;
        };


        $scope.contactRelic = function(contact){


            console.log('sending the captcha response to the server', $scope.response);

            mainService.verifyCaptcha($scope.response).then(function(res){

                console.log(res.data.success);

               if(res.data.success) {

                   console.log('Success');

                   mainService.contactRelic(contact).then(function(response){
                       console.log(response);
                   })
               } if(!res.data.success) {
                    console.log('Failed validation');
                    // In case of a failed validation you need to reload the captcha
                    // because each response can be checked just once
                    vcRecaptchaService.reload($scope.widgetId);
                    alert('Sorry, we couldn\'t verify you, please try again.')
                }
            });

        };


    });
})();