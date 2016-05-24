app.controller('mainController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.loginButtonShow = $rootScope.token == undefined;
	$scope.user = $rootScope.user;
	
	$scope.logout = function(){
		$rootScope.token = null;
		$rootScope.user = null;

		$scope.loginButtonShow = true;
	}

	$scope.refreshUser = function(){
		$scope.user = $rootScope.user;
	}
}]);