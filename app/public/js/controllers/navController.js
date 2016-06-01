app.controller('navController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.logout = function(){
		$rootScope.token = null;
		$rootScope.user = null;

		if (typeof(Storage) !== "undefined") {
			localStorage.clear();
		};
	};

	$scope.login = function (argument) {
		$rootScope.$state.go("login");	
	};
}]);