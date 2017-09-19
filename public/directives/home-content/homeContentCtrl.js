/**
 * Created by Seth on 8/9/2017.
 */
(function(){
    angular.module('app')
        .controller('homeContentCtrl', function($scope){

            let previousContent = "main-content",
                previousTop = "",
                mainContent = document.getElementById('main-content'),
                services = document.getElementById('services'),
                work = document.getElementById('work'),
                articles = document.getElementById('articles'),
                swnContainer = document.getElementById('swn-container'),
                swnTopContainer = document.getElementById('swn-top-container'),
                swnBottomContainer = document.getElementById('swn-bottom-container');


            $scope.switchContent = function(switcher){

                if(window.innerWidth < 600) {

                    console.log('Yo!');

                    TweenMax.to(swnContainer, 0.15, {
                        height: "270vh"
                    });
                    TweenMax.to(swnTopContainer, 0.15, {
                        height: "10%"
                    });
                }


                TweenMax.to(document.getElementById("top-" + switcher), 0.5,  {backgroundColor: "white", color: '#161616'});
                if(previousTop !== "" && previousTop !== "top-" + switcher){
                    TweenMax.to(document.getElementById(previousTop), 0.5, {backgroundColor: '#161616', color: "white"});
                }

                  TweenMax.to(document.getElementById(previousContent), 0, { display: "none"} );
                  TweenMax.to(document.getElementById(switcher), 0, { display: 'flex' });

                  previousContent = switcher;
                  previousTop = "top-" + switcher;

                };

            $scope.switcher = function(){
                TweenMax.to(document.getElementById(previousContent), 0, { display: "none"});
                TweenMax.to(document.getElementById('main-content'), 0, { display: "flex"}, 0.5);
                TweenMax.to(document.getElementById(previousTop), 0.25, {backgroundColor: '#161616', color: "white"});

                previousContent = 'main-content';
                previousTop = "";

                if(window.innerWidth < 600) {

                    console.log('Yo mama....');

                    TweenMax.to(swnContainer, 0.15, {
                        height: "30vh"
                    });
                    TweenMax.to(swnTopContainer, 0.15, {
                        height: "80%"
                    });
                }
            };

            $scope.swnContentHover = function(num){

                // if(num === "four"){
                //     TweenMax.to(document.getElementById('services-content-' + num), 0.5, {ease: Power2.easeOut, height: "200px", width: "200px"}, 0.25)
                // } else { TweenMax.to(document.getElementById('services-content-' + num), 0.5, {ease: Power2.easeOut, height: "250px", width: "250px"}, 0.25) }

            };

            $scope.swnContentHoverLeave = function(num) {
                // if(num === "four"){
                //     TweenMax.to(document.getElementById('services-content-' + num), 0.25, {ease: Power2.easeOut, height: "175px", width: "175px"})
                // } else { TweenMax.to(document.getElementById('services-content-' + num), 0.25, {ease: Power2.easeOut, height: "225px", width: "225px"}) }            }
            };

                $scope.clientHover = function(num){
                        // TweenMax.to(document.getElementById('client-image-' + num), 0.5, {
                        //     height: "225px",
                        //     width: "225px",
                        //     ease: Power3.easeOut
                        // })
                };
                $scope.clientHoverLeave = function(num){
                    //     TweenMax.to(document.getElementById('client-image-' + num), 0.25, {
                    //         height: "200px",
                    //         width: "200px"
                    // })
                };

                $scope.articleHover = function(num){
                    // TweenMax.to(document.getElementById('article-pic-' + num), 0.5, {
                    //     height: "225px",
                    //     width: "225px",
                    //     ease: Power3.easeOut
                    // })
                };
                $scope.articleHoverLeave = function(num){
                    // TweenMax.to(document.getElementById('article-pic-' + num), 0.25, {
                    //     height: "200",
                    //     width: "200px"
                    // })
                };

        })
})();