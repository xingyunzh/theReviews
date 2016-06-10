app.controller('navController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.logout = function(){
		$rootScope.token = null;
		$rootScope.currentUser = null;

		if (typeof(Storage) !== "undefined") {
			localStorage.clear();
		};

		$rootScope.$state.go("nav.main");
	};

	$scope.login = function (argument) {
		$rootScope.$state.go("login");	
	};
}]);