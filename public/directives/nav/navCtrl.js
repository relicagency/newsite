(function(){
    angular.module('app')
        .controller('navCtrl', function($scope){
            let lastNavTitle = "";
            $scope.routeLighter = function(num) {
                let title = document.getElementById('nav-item-title-' + num),
                    lastTitle = document.getElementById('nav-item-title-' + lastNavTitle);
                if(num === "home"){
                    TweenMax.to( lastTitle, 0.15, {
                        color: "#95989A"
                    });
                    lastNavTitle = "";
                    return;
                }
                if(lastNavTitle !== "" && lastNavTitle !== num){
                    TweenMax.to( lastTitle, 0.15, {
                        color: "#95989A"
                    })
                }

                TweenMax.to(title, 0.25, {
                    color: "white"
                });
                lastNavTitle = num;
            };

            $scope.navDropper = function(num) {
                TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.15,  {
                    ease: Power1.easeIn,
                    display: "flex",
                    opacity: 1,
                    height: "auto"
                });

                TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.4, {
                    color: "#242424"
                });
            };

            $scope.navShrinker = function(num) {
                TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.15, {
                    color: "transparent"
                });
                TweenMax.to(document.getElementById('nav-item-drop-' + num), 0.15,  {
                    ease: Power3.easeIn,
                    opacity: 0,
                    display: "none"
                    //height: 0
                }, 0.25);
            };

            $scope.dropDownHover = function(num){
                TweenMax.to(document.getElementById('drop-down-item-' + num), 0.25, {
                    backgroundColor: "rgba(255,255,255,1)"
                })
            };

            $scope.dropDownHoverLeave = function(num){
                TweenMax.to(document.getElementById('drop-down-item-' + num), 0.15, {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    color: "#242424"
                })
            };

            $scope.getStarted = function(){
                mainService.navGetStarted();
            }

        })
})();