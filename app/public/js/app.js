var app = angular.module("app", ["ui.router", "720kb.datepicker", "ui.bootstrap"])
	.run(['$rootScope', '$state', '$stateParams', 'userService', '$window', function($rootScope, $state, $stateParams, userService, $window) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

		$rootScope.back = function () {
			 /* body... */ 
			 $window.history.back();
		}


		//auto login with last user
		if (typeof(Storage) !== "undefined" && localStorage.token != null) {
			$rootScope.token = localStorage.token;

			userService.getCurrentUser($rootScope.token).then(function(user) {
				$rootScope.user = user;
				$state.go("nav.main");
			}, function(errorText) {
				$rootScope.user = null;
				$rootScope.token = null;
				localStorage.clear();
				$state.go("nav.main");
			});


		} else {
			 $state.go("nav.main");
		};

	}]);
