/**
 * Created by Seth on 8/14/2017.
 */
(function(){
    angular.module('app').controller('contactCtrl', function($scope, $timeout, mainService, vcRecaptchaService){



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
            if(window.innerWidth < 426){
                window.scrollTo(0, 900);
            }window.pageYOffset = 100;
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

                   console.log('Google has verified the user.');

                   mainService.contactRelic(contact).then(function(response){
                       console.log(response);
                       if(response.status === 200){
                           $scope.formStatus = "Awesome!  Looks like your message went through.  We\'ll be in touch with you as soon as possible.";


                           if(window.innerWidth <= 425){
                               TweenMax.to(document.getElementById('form-status-message'), 0.15, {
                                   display: "flex",
                                   ease: Power2.easeIn,
                                   position: "fixed",
                                   top: 0,
                                   left: 0
                               });
                           }
                           if(window.innerWidth > 426) {
                               TweenMax.to(document.getElementById('form-status-message'), 0.15, {
                                   display: "flex",
                                   position: "absolute",
                                   ease: Power2.easeIn
                               });
                           }


                       }
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

        $scope.exitFormStatus = function(){

                TweenMax.to(document.getElementById('form-status-message'), 0.15, {
                    display: "none",
                    ease: Power2.easeOut
                });

                for(const i in $scope.contact){
                    $scope.contact[i] = null;
                }
                vcRecaptchaService.reload($scope.widgetId);
        }


    });
})();