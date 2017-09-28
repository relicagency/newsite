/**
 * Created by Seth on 8/11/2017.
 */
(function() {
    angular.module('app').service('mainService', function ($http) {

        let nav = document.getElementById('nav');

        this.navBackground = function(offset){


             if(offset > 100){
                  TweenMax.to(nav, 2, {
                      backgroundColor: "rgba(0,0,0,0.9)"
                  })
             } if(offset < 95){
                 TweenMax.to(nav, 2, { backgroundColor: "rgba(0,0,0,0)"} );
            }

        };

        this.parallaxIt = function(pic, picLax){
            TweenMax.to(pic, 0, {
                top: (picLax / 2) + "px"
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