/**
 * Created by Seth on 8/21/2017.
 */
(function(){
    angular.module('app')
        .controller('ourWorkCtrl', function($scope, $stateParams, $state, mainService){

             $scope.client = mainService.clients[$stateParams.client];

             if($scope.client.intro === ""){
                 TweenMax.to(document.getElementById('client-content-intro'), 0, {
                     display: "none"
                 })
             }
             if($scope.client.stats === "") {
                 TweenMax.to(document.getElementById('client-stats-container'), 0, {
                     display: "none"
                 })
             }
             if(!$scope.client.video){
                 TweenMax.to(document.getElementById('client-video-container'), 0, {
                     display: "none"
                 })
             } if($scope.client.webDesign === ""){
                TweenMax.to(document.getElementById('client-webdesign-container'), 0, {
                    display: "none"
                })
            } if($scope.client.digitalAdds === ""){
                TweenMax.to(document.getElementById('client-digital-container'), 0, {
                    display: "none"
                })
            } if($scope.client.brochures === ""){
                TweenMax.to(document.getElementById('client-brochures-container'), 0, {
                    display: "none"
                })
            } if($scope.client.directMail === ""){
                TweenMax.to(document.getElementById('client-dmail-container'), 0, {
                    display: "none"
                })
            } if($scope.client.billboards === ""){
                TweenMax.to(document.getElementById('client-billboard-container'), 0, {
                    display: "none"
                })
            } if($scope.client.branding === ""){
                TweenMax.to(document.getElementById('client-branding-container'), 0, {
                    display: "none"
                })
            }  if($scope.client.posters === ""){
                TweenMax.to(document.getElementById('client-posters-container'), 0, {
                    display: "none"
                })
            }  if($scope.client.postcards === ""){
                TweenMax.to(document.getElementById('client-postcards-container'), 0, {
                    display: "none"
                })
            } if($scope.client.newspaper === ""){
                TweenMax.to(document.getElementById('client-newspaper-container'), 0, {
                    display: "none"
                })
            } if($scope.client.illustrations === ""){
                TweenMax.to(document.getElementById('client-illustration-container'), 0, {
                    display: "none"
                })
            } if($scope.client.stationary === ""){
                TweenMax.to(document.getElementById('client-stationary-container'), 0, {
                    display: "none"
                })
            }  if($stateParams.client === "us"){
                TweenMax.to(document.getElementById('client-newspaper-container'), 0, {
                    display: "none"
                });
                TweenMax.to(document.getElementById("us-newspaper-container"), 0, {
                    display: "flex"
                })
            } if($stateParams.client === "ccbh"){
                TweenMax.to(document.getElementById('client-digital-container'), 0, {
                    display: "none"
                });
                TweenMax.to(document.getElementById("ccbh-digital-container"), 0, {
                    display: "flex"
                })
            } if($stateParams.client === "beehive"){

                TweenMax.to(document.getElementById('client-webdesign-container'), 0, {
                    display: "none"
                });
                TweenMax.to(document.getElementById('beehive-webdesign-container'), 0, {
                    display: "flex"
                })

            } if($stateParams.client === "rubys"){
                TweenMax.to(document.getElementById('client-newspaper-container'), 0, {
                    display: "none"
                });
                TweenMax.to(document.getElementById('rubys-newspaper-container'), 0, {
                    display: "flex"
                })
            } if($stateParams.client === "b2scapes"){
                TweenMax.to(document.getElementById('posters-title'), 0, {
                    display: "none"
                })
            } if($stateParams.client === "branding"){
                TweenMax.to(document.getElementById('client-branding-container'), 0, {
                    display: "none"
                })
                TweenMax.to(document.getElementById('main-branding-container'), 0, {
                    display: "flex"
                })
            }





            let backgroundPic = document.getElementById('tds-background');

            window.onscroll = function() {
                let offSet = window.pageYOffset,
                    csParaStart = offSet * 0.75;

                mainService.navBackground(offSet);
                mainService.parallaxIt(backgroundPic,csParaStart);
            };


                //This adjusts the height of the main container based on the page
                TweenMax.to(document.getElementById('work-show-main-container'), 0, {
                    height: $scope.client.height
                })


        })
})();