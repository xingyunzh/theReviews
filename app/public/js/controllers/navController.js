app.controller('navController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.loginButtonShow = $rootScope.token == undefined;
	
	$scope.logout = function(){
		$rootScope.token = null;
		$rootScope.user = null;

		$scope.loginButtonShow = true;
	};

	$scope.login = function (argument) {
		$rootScope.$state.go("login");	
	};
}]);