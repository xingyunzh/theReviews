app.controller('navController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.logout = function(){
		$rootScope.token = null;
		$rootScope.user = null;

		if (typeof(Storage) !== "undefined") {
			localStorage.token = null;
		};
	};

	$scope.login = function (argument) {
		$rootScope.$state.go("login");	
	};
}]);