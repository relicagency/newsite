(function(){
  angular.module('app')
  .controller('homeCtrl', function($scope){

      let homeMainContainer = document.getElementById('home-hero'),
          headlineContent = document.getElementById('headline-content'),
          backgroundGrad = document.getElementById('home-linear-grad'),
          navBackdrop = document.getElementById('nav-backdrop');

      window.onscroll = function(){
          let csParaStart = window.pageYOffset * 0.75;

          homeMainContainer.style.backgroundPositionY = csParaStart + "px";
          headlineContent.style.opacity = 1 - (csParaStart * 0.0019);
          headlineContent.style.top = 50 + (csParaStart * 0.075) + "%";
          backgroundGrad.style.opacity = 0.5 - (csParaStart * 0.004);

         if(window.pageYOffset > 100){
             TweenMax.to(navBackdrop, 2, { opacity: "0.8"});
         } if(window.pageYOffset < 95){
             TweenMax.to(navBackdrop, 2, { opacity: 0})
          }

      };

      // let video = document.getElementsByClassName('home-video');
      //
      // let playButton = document.getElementsByClassName('play-pause');
      // let mute = document.getElementsByClassName('mute');
      // let fullScreen = document.getElementsByClassName('full-screen');
      //
      // let seekBar = document.getElementsByClassName('seek-bar');
      // let volumeBar = document.getElementsByClassName('volume-bar');
      //
      // playButton.addEventListener('click', function(){
      //     if(video.paused == true){
      //         video.play();
      //
      //         playButton.innerHTML = 'Pause'
      //     } else{
      //         video.pause();
      //         playButton.innerHTML = 'Play'
      //     }
      //
      // });
      //
      // mute.addEventListener('click', function(){
      //     if(video.muted == false){
      //         video.muted = true;
      //         mute.innerHTML = 'Unmute'
      //     } else {
      //         video.muted = false;
      //
      //         mute.innerHTML = 'Mute'
      //     }
      // });
      //
      // fullScreen.addEventListener('click', function(){
      //     if(video.requestFullScreen){
      //         video.requestFullScreen();
      //     }  else if (video.mozRequestFullScreen){
      //         video.mozRequestFullScreen();
      //     } else if (video.webkitRequestFullScreen){
      //         video.webkitRequestFullScreen();
      //     }
      // });
      //
      // seekBar.addEventListener('change', function(){
      //     let time = video.duration * (seekBar.value / 100)
      //     video.currentTime = time;
      // });
      //
      // video.addEventListener('timeupdate', function(){
      //     let value = (100 / video.duration) * video.currentTime;
      //     seekBar.value = value;
      // });
      //
      // seekBar.addEventListener('mousedown', function(){
      //     video.pause();
      // });
      // seekBar.addEventListener('mouseup', function(){
      //     video.play();
      //     playButton.innerHTML = 'Pause'
      // });
      //
      // volumeBar.addEventListener('change', function () {
      //     video.volume = volumeBar.value;
      // });

  })
})()