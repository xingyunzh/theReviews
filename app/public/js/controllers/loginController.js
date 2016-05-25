app.controller("loginController", function($rootScope, $scope, loginService, userService) {
	$scope.login = function() {
		var username = $scope.usernameInput;
		var password = $scope.passwordInput;
		$scope.disableLoginButton = false;

		if (username == undefined) {
			toastr.error("Please input the username!");

			return;
		};

		if (password) {
			toastr.info("Login in processing...", "Info", {timeOut:0});

			$scope.disableLoginButton = true;
			loginService.login(username, password).then(function success(data){
				toastr.remove();

				$rootScope.token = data.token;

				userService.getUserById(data.uid).then(function(user){
					$rootScope.user = user;
				}, function(errorText){
					$rootScope.user = null;
				});

				$rootScope.$state.go("main");
			}, function error(data){
				toastr.remove();

				toastr.error("Invalid username or password:" + data, "Error", {timeOut:10});
				$scope.passwordInput = null;
				$scope.disableLoginButton = false;
			});

		} else {
			toastr.error("Please input your password");
			
		};
	}

	$scope.goRegister = function(){
		$rootScope.$state.go("register");
	}
});