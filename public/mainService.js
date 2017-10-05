/**
 * Created by Seth on 8/11/2017.
 */
(function() {
    angular.module('app').service('mainService', function ($http) {

        let nav = document.getElementById('nav');

        this.navBackground = function(offset){


             if(offset > 50){
                  TweenMax.to(nav, 0.5, {
                      backgroundColor: "rgba(0,0,0,0.95)"
                  })
             } if(offset < 45){
                 TweenMax.to(nav, 1, { backgroundColor: "rgba(0,0,0,0)"} );
            }

        };

        this.parallaxIt = function(pic, picLax){
            TweenMax.to(pic, 0, {
                top: (picLax / 2) + "px"
            })
        };

        this.verifyCaptcha = function(str){

            return $http ({
                method: 'POST',
                url: '/relic/verify',
                data: {
                    captchaString: str
                }
            }).then(function(res){
                return res
            })

        };

        this.contactRelic = function(contact){

            return $http ({
                method: 'POST',
                url: '/relic/contact',
                data : {
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    jobTitle: contact.jobTitle,
                    business: contact.business,
                    email: contact.email,
                    phone: contact.phone,
                    message: contact.message,
                    captcha: contact.captcha
                }
            }).then(function(response){
                return response
            })
        };

        this.backgrounds = [
            "../../images/work-backgrounds/relic1.jpg",
            "../../images/work-backgrounds/relic1.jpg",
            "../../images/work-backgrounds/relic2.jpg",
            "../../images/work-backgrounds/relic3.jpg",
            "../../images/work-backgrounds/relic4.jpg",
            "../../images/work-backgrounds/relic5.jpg",
            "../../images/work-backgrounds/relic6.jpg",
            "../../images/work-backgrounds/relic7.jpg",
            "../../images/work-backgrounds/relic8.jpg",
            "../../images/work-backgrounds/relic9.jpg",
            "../../images/work-backgrounds/relic10.jpg",
            "../../images/work-backgrounds/relic10.jpg"
        ]

    });
})();