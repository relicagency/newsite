(function () {
	angular.module('app')
		.controller('demandgenCtrl', function ($scope, mainService) {
			let backgroundPic = document.getElementById('demandgen-background');

			window.onscroll = function () {
				let offSet = window.pageYOffset,
					csParaStart = offSet * 0.5050505050505050;

				mainService.navBackground(offSet);
				mainService.parallaxIt(backgroundPic, csParaStart);
			};

			$scope.workEnter = function () {
				let overlay = event.currentTarget.children[0];
				TweenMax.to(overlay, 0.25, { opacity: 0 });
			}
			$scope.workLeave = function () {
				let overlay = event.currentTarget.children[0];
				TweenMax.to(overlay, 0.25, { opacity: 1 })
			}
			
		})
})();

