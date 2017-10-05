/**
 * Created by Seth on 8/23/2017.
 */
(function(){
    angular.module('app').controller('getStartedCtrl', function($scope, $timeout, mainService, vcRecaptchaService){

        $scope.ctaText = "Learn how we can help you.";

        if(window.location.href.indexOf('tourism') > -1 ){
            $scope.ctaText = "Looking to bring more visitors to you area?"
        } if(window.location.href.indexOf('demandgen') > -1){
            $scope.ctaText = "Looking for demand gen help?"
        }

        let mainPop = document.getElementById('cta-pop-up'),
            barFive = document.getElementById('get-started-animation-five'),
            barSix = document.getElementById('get-started-animation-six'),
            barSeven = document.getElementById('get-started-animation-seven');

        $scope.ctaShow = function () {
            let tl = new TimelineMax();
            tl.to(mainPop, 0.5, { ease: Power2.easeIn, left: 0 })
                .to(barFive, 0.15, {left: 0}, "+=0.5")
                .to(barSix, 0.15, {right: 0})
                .to(barSeven, 0.15, {left: 0})
                .to(barSix, 0.15, {left: "101%"}, "-=0.15");
        };

        $scope.ctaHide = function(){
            let tl = new TimelineMax();
            tl.to(barSeven, 0.15, {left: "101%"})
                .to(barSix, 0.15, {left: 0}, "-=0.15")
                .to(barFive, 0.15, {left: "101%"})
                .to(barSix, 0.15, {left: '-100%'}, "-=0.15")
                .to(mainPop, 0.5, { ease: Power2.easeIn, left: "-101%" })
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

                    console.log('Google has verified the user.');

                    mainService.contactRelic(contact).then(function(response){
                        console.log(response);
                        if(response.status === 200){
                            $scope.formStatus = "Awesome!  Looks like your message went through.  We\'ll be in touch with you as soon as possible.";
                            TweenMax.to(document.getElementById('get-started-form-status-message'), 0.15, {
                                display: "flex",
                                ease: Power2.easeIn
                            });
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

        $scope.exitFormStatus = function(contact){

            TweenMax.to(document.getElementById('get-started-form-status-message'), 0.15, {
                display: "none",
                ease: Power2.easeOut
            });

            for(const i in contact){
                contact[i] = null;
            }
            vcRecaptchaService.reload($scope.widgetId);
        }


    })
})();