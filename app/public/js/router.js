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
		templateUrl:"html/pages/main.html",
		controller:"mainController"
	})
	.state("nav.aboutus",{
		url:"/aboutus",
		templateUrl : "html/pages/aboutus.html"
	})
	.state("login", {
		url : "/login",
		templateUrl : "html/pages/login.html",
		controller: "loginController"
	})
	.state("register", {
		url : "/register",
		templateUrl : "html/pages/register.html",
		controller:"registerController"
	})
	.state("nav.updateprofile",{
		url:"/updateprofile",
		templateUrl:"html/pages/update-profile.html",
		controller:"updateController"
	});

}]);