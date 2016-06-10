app.controller("loginController", function($rootScope, $scope, loginService, userService) {
	$scope.login = function() {
		var username = $scope.usernameInput;
		var password = $scope.passwordInput;
		$scope.disableLoginButton = false;

		if (username == undefined) {
			toastr.error("请输入用户名");

			return;
		};

		if (password) {
			toastr.info("正在登陆，请稍后", "Info", {timeOut:0});

			$scope.disableLoginButton = true;
			loginService.login(username, password).then(function success(data){
				toastr.remove();

				$rootScope.token = data.token;
				if (typeof(Storage) !== "undefined") {
					localStorage.token = data.token;
				};

				userService.getUserById(data.uid).then(function(user){
					$rootScope.currentUser = user;
				}, function(errorText){
					$rootScope.currentUser = null;
				});

				$rootScope.$state.go("nav.main");
			}, function error(data){
				toastr.remove();

				toastr.error("不正确的用户名或密码：" + data, "Error", {timeOut:10});
				$scope.passwordInput = null;
				$scope.disableLoginButton = false;
			});

		} else {
			toastr.error("请输入密码");
			
		};
	}

	$scope.goRegister = function(){
		$rootScope.$state.go("register");
	}
});