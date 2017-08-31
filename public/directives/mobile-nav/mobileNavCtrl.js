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
            hamburgerThree = document.getElementById('hamburger-three'),
            hamburgerFour = document.getElementById('hamburger-four'),
            hamburgerFive = document.getElementById('hamburger-five'),
            hamburgerSix = document.getElementById('hamburger-six');





            $scope.exitNav = function(){

            if(trigger){
                tl.to(hamburgerFour, 0.08, {left: "-21px", top: "19px", transform: "rotate(-90deg)"})
                    .to(hamburgerFive, 0.08, {right: "-30px"})
                    .to(hamburgerSix, 0.08, {right: "-30px"}, "-=0.08")
                    .to(hamburgerTwo, 0.08, {position: "absolute", top: "19px", right: "-51px", transform: "rotate(270deg)" })
                    .to(hamburgerOne, 0.08, {position: "absolute", top: 0})
                    .to(hamburgerThree, 0.08, {position: "absolute", bottom: "-30px"})
                    .to(hamburgerFive, 0.08, {transform: "rotate(45deg)"})
                    .to(hamburgerSix, 0.08, {transform: "rotate(-45deg)"}, "-=0.08")
                    .to(mobileNav, 0.15, {right: 0, ease: Power2.easeIn})
            } if(!trigger) {
                    tl.to(hamburgerSix, 0.08, {transform: "rotate(0deg)"}, "-=0.08")
                        .to(hamburgerFive, 0.08, {transform: "rotate(0deg)"})
                        .to(hamburgerThree, 0.08, {position: "relative", bottom: 0})
                        .to(hamburgerOne, 0.08, {position: "relative"})
                        .to(hamburgerTwo, 0.08, {position: "relative", top: '0', left: 0, transform: "rotate(0deg)"})
                        .to(hamburgerSix, 0.08, {right: "-100px"})
                        .to(hamburgerFive, 0.08, {right: "-100px"}, "-=0.08")
                        .to(hamburgerFour, 0.08, {top: "6px", left: 0, transform: "rotate(0deg)"})
                        .to(mobileNav, 0.15, {right: "-101%", ease: Power2.easeOut})
            }

            trigger = !trigger;
        };


    })
})();


// .mobile-hamburger {
//     visibility: visible;
//     position: fixed;
//     top: 50px;
//     right: 50px;
//     z-index: 20;
//     height: 40px;
//     width: 40px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-around;
//     align-items: center;
//     background-color: transparent;
//     outline: none;
//     border: none;
// }
// .hamburger-patty {
//     height: 2px;
//     width: 40px;
//     background-color: white;
// }
// .extra-patty-one {
//     position: absolute;
//     top: 6px;
// }
// .extra-patty-two {
//     position: absolute;
//     right: -100px;
//     background-color: #bd9a35;
// }
// .extra-patty-three {
//     position: absolute;
//     right: -100px;
//     background-color: #BD9A35;
// }
//