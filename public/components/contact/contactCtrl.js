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


            let valid;
            /**
             * SERVER SIDE VALIDATION
             *
             * You need to implement your server side validation here.
             * Send the reCaptcha response to the server and use some of the server side APIs to validate it
             * See https://developers.google.com/recaptcha/docs/verify
             */

            

            console.log('sending the captcha response to the server', $scope.response);
            if (valid) {
                console.log('Success');
            } else {
                console.log('Failed validation');
                // In case of a failed validation you need to reload the captcha
                // because each response can be checked just once
                vcRecaptchaService.reload($scope.widgetId);
            }



            // mainService.contactRelic(contact).then(function(response){
            //     console.log(response);
            // })
            console.log(contact);

            //error checking
           for(const i in contact) {
             console.log(contact[i]);
           }

            for(const i in contact) {
                if(contact[i] === "") {
                    console.log("Sheesh.,.....")
                }
            }


        };


    });
})();