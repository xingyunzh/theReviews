app.controller("loginController", function($scope) {
	$scope.login = function() {
		var username = $scope.emailInput;
		var password = $scope.passwordInput;


		console.log('login clicked!');

		if (username && password && username == password) {
			toastr.info("username == password");
		} else {
			toastr.error("Invalid username or password");
		};
	}
});