app.controller("registerController", function($rootScope, $scope, $q, userService) {
	$scope.formdata = {sex:"male", birth:new Date("1990-10-01"), graduatedDate:new Date("2001-07-01")};
	$scope.validationResult = null;

	var kUsernameValidationSuccessText = "用户名可用";
	var kUsernameValidationFailText =  "用户名已经被占用，请您选择其他名字";
	var kUsernameValidationEmptyText = "请填写用户名";

	var usernameToValidate = null;

	function contentValidate(argument) {
		 if ($scope.formdata.username == null || $scope.formdata.username != usernameToValidate || $scope.validationResult != kUsernameValidationSuccessText) {
		 	return "为保证用户名唯一性，请您点击验证按钮";
		 }; 

		 if ($scope.formdata.password == null || $scope.formdata.password.length < 6 || $scope.formdata.password !== $scope.formdata.cpassword) {
		 	return "请设置你的密码并确认，密码为数不得少于6位"
		 };

		 if ($scope.formdata.name == null) {
		 	return "请设置你的姓名"
		 };

		 if ($scope.formdata.colleage == null) {
		 	return "请填写你的院校"
		 };

		 if ($scope.formdata.email == null) {
		 	return "请填写正确的电子邮箱地址";
		 };

		 if ($scope.formdata.tel == null || $scope.formdata.tel.length < 8) {
		 	return "请填写正确的电话号码";
		 };

		 return null;
	}

	$scope.register = function() {
		var validateMessage = contentValidate();
		if (validateMessage) {
			toastr.error(validateMessage, "请完成全部必填项", {timeOut:0, closeButton:true});
			return;
		}

		userService.addUser($scope.formdata).then(function success(data) {
			 $rootScope.$state.go("nav.main");  
		}, function fail(argument) {
			  toastr.error("注册错误， 请稍后再试！", "系统错误", {timeOut:5});
		})
	}

	$scope.validateUsername=function() {
		usernameToValidate = $scope.formdata.username;

		if (usernameToValidate == null || usernameToValidate.length < 1) {
			$scope.validationResult = kUsernameValidationEmptyText;

			return; 
		};

		var deferred = $q.defer();
		userService.getUserByUsername(usernameToValidate).then(function success(user) {
			if (user) {
				$scope.validationResult = kUsernameValidationFailText;
			} else{
				$scope.validationResult = kUsernameValidationSuccessText;
			};  
		}, function fail(argument) {
			 	$scope.validationResult = null;
		})
	}
});