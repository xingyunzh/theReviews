app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.when("", "/main");
	$stateProvider.state("nav", {
		url:"/nav",
		templateUrl:"html/nav.html",
		controller:"navController",
		abstract:true,
	})
	.state("nav.main", {
		url:"/main",
		templateUrl:"html/main.html",
		controller:"mainController"
	})
	.state("nav.workpanel", {
		url:"/workpanel",
		templateUrl:"/modules/workpanel/workpanel.html",
		controller : "workpanelController"
	})
	.state("login", {
		url : "/login",
		templateUrl : "/modules/user/login.html",
		controller: "loginController"
	})
	.state("register", {
		url : "/register",
		templateUrl : "/modules/user/register.html",
		controller:"registerController"
	})
	.state("updateprofile",{
		url:"/updateprofile",
		templateUrl:"/modules/user/update-profile.html",
		controller:"updateController"
	});

}]);