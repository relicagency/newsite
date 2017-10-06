(function(){
    angular.module('app').controller('mobileNavCtrl', function($scope, mainService){

        let tl = new TimelineMax(),
            mobileNav = document.getElementById('mobile-nav-popup'),
            trigger = true,
            hb1 = document.getElementById('ham-one'), hb2 = document.getElementById('ham-two'),
            hb3 = document.getElementById('ham-three'), hb4 = document.getElementById('ham-four'),
            hb5 = document.getElementById('ham-five');

        $scope.exitNav = function(section){
            if(trigger) {
                tl.to(hb1, 0.1, {opacity: 0})
                    .to(hb2, 0.1, {opacity: 0}, "-=0.1")
                    .to(hb3, 0.1, {opacity: 0}, "-=0.2")
                    .to(hb4, 0.15, {rotation: -45})
                    .to(hb5, 0.15, {rotation: 45}, "-=0.15")
                    .to(mobileNav, 0.25, {right: 0, ease: Power3.easeIn}, "-=0.15")
                    .to(hb4, 0.5, {backgroundColor: "black"}, "-=0.15")
                    .to(hb5, 0.5, {backgroundColor: "black"}, "-=0.5")
                    .to(hb1, 0.1, {top: "10px"})
                    .to(hb3, 0.1, {bottom: "10px"}, "-=0.1");
                trigger = false;
            } else if(!trigger) {
                tl.to(hb4, 0.1, { opacity: 0, backgroundColor: "white"})
                    .to(hb5, 0.1, { opacity: 0, backgroundColor: "white"}, "-=0.1")
                    .to(hb2, 0.1, { opacity: 1, backgroundColor: "white"})
                    .to(hb1, 0.1, { opacity: 1, top: 0, backgroundColor: "white"})
                    .to(hb3, 0.1, { opacity: 1, bottom: 0, backgroundColor: "white"}, "-=0.1")
                    .to(mobileNav, 0.25, {right: "-101%", ease: Power2.easeOut}, "-=0.2")
                    .to(hb4, 0.01, { rotation: 0 })
                    .to(hb5, 0.01, { rotation: 0 })
                    .to(hb4, 0.01, { opacity: 1 })
                    .to(hb5, 0.01, { opacity: 1 });
                trigger = true;
            }
        };
    })
})();

// /**
//  * Created by Seth on 8/30/2017.
//  */
// (function(){
//     angular.module('app').controller('mobileNavCtrl', function($scope, mainService){
//
//         let tl = new TimelineMax(),
//             mobileNav = document.getElementById('mobile-nav-popup'),
//             trigger = true,
//             hamburgerOne = document.getElementById('hamburger-one'),
//             hamburgerTwo = document.getElementById('hamburger-two'),
//             hamburgerThree = document.getElementById('hamburger-three');
//
//
//
//
//
//             $scope.exitNav = function(section){
//
//                 if( section !== "dont" ) {
//                     TweenMax.to(document.getElementById('mobile-nav-section-' + section), 0.05, {
//                         backgroundColor: "rgba(255,255,255,1)",
//                         ease: Power2.easeIn
//                     });
//                 }
//
//             if(trigger){
//                   tl.to(hamburgerTwo, 0.08, {top: "44%", backgroundColor: "#262626"})
//                     .to(hamburgerOne, 0.08, {top: "47%", backgroundColor: "#262626"})
//                     .to(hamburgerThree, 0.08, {top: "47%", backgroundColor: "#262626"})
//                     .to(hamburgerOne, 0, { opacity: 0})
//                     .to(hamburgerThree, 0.08, {transform: "rotate(45deg)"})
//                     .to(hamburgerTwo, 0.08, {transform: "rotate(-45deg)"})
//                     .to(mobileNav, 0.15, {right: 0, ease: Power2.easeIn});
//             } if(!trigger && section !== "dont") {
//                       tl.to(hamburgerThree, 0.08, {transform: "rotate(0deg)"})
//                         .to(hamburgerTwo, 0.08, {transform: "rotate(0deg)"})
//                         .to(hamburgerThree, 0.08, { top: "86%", backgroundColor: "white"})
//                         .to(hamburgerOne, 0.08, { opacity: 1, top: 0, backgroundColor: "white"})
//                         .to(hamburgerTwo, 0.08, { top: "45%", backgroundColor: "white"})
//                         .to(mobileNav, 0.15, {right: "-101%", ease: Power2.easeOut})
//                         .to(document.getElementById('mobile-nav-section-' + section), 0, {backgroundColor: "transparent"});
//             } if(!trigger) {
//                     tl.to(hamburgerThree, 0.08, {transform: "rotate(0deg)"})
//                         .to(hamburgerTwo, 0.08, {transform: "rotate(0deg)"})
//                         .to(hamburgerThree, 0.08, { top: "86%", backgroundColor: "white"})
//                         .to(hamburgerOne, 0.08, { opacity: 1, top: 0, backgroundColor: "white"})
//                         .to(hamburgerTwo, 0.08, { top: "44%", backgroundColor: "white"})
//                         .to(mobileNav, 0.15, {right: "-101%", ease: Power2.easeOut});
//                 }
//
//             trigger = !trigger;
//         };
//
//
//     })
// })();
