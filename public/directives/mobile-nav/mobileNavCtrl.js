/**
 * Created by Seth on 8/30/2017.
 */
(function(){
    angular.module('app').controller('mobileNavCtrl', function($scope, mainService){

        let tl = new TimelineMax(),
            mobileNav = document.getElementById('mobile-nav-popup'),
            trigger = true,
            hamburgerOne = document.getElementById('hamburger-one'),
            hamburgerTwo = document.getElementById('hamburger-two'),
            hamburgerThree = document.getElementById('hamburger-three');





            $scope.exitNav = function(section){

                if(section !== "dont") {
                    TweenMax.to(document.getElementById('mobile-nav-section-' + section), 0.05, {
                        backgroundColor: "rgba(255,255,255,1)",
                        ease: Power2.easeIn
                    });
                }

            if(trigger){
                tl.to(hamburgerTwo, 0.08, {top: "46%", backgroundColor: "black"})
                    .to(hamburgerOne, 0.08, {top: "47%", backgroundColor: "black"})
                    .to(hamburgerThree, 0.08, {top: "47%", backgroundColor: "black"})
                    .to(hamburgerOne, 0, { opacity: 0})
                    .to(hamburgerThree, 0.08, {transform: "rotate(45deg)"})
                    .to(hamburgerTwo, 0.08, {transform: "rotate(-45deg)"})
                    .to(mobileNav, 0.15, {right: 0, ease: Power2.easeIn});
            } if(!trigger) {
                    tl.to(hamburgerThree, 0.08, {transform: "rotate(0deg)"})
                        .to(hamburgerTwo, 0.08, {transform: "rotate(0deg)"})
                        .to(hamburgerThree, 0.08, { top: "86%", backgroundColor: "white"})
                        .to(hamburgerOne, 0.08, { opacity: 1, top: 0, backgroundColor: "white"})
                        .to(hamburgerTwo, 0.08, { top: "47%", backgroundColor: "white"})
                        .to(mobileNav, 0.15, {right: "-101%", ease: Power2.easeOut})
                        .to(document.getElementById('mobile-nav-section-' + section), 0, {backgroundColor: "transparent"});
            }

            trigger = !trigger;
        };


    })
})();
