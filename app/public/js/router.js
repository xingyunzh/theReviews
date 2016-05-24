app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.when("", "/main");
	$stateProvider.state("main", {
		url:"/main",
		templateUrl:"html/pages/main.html",
		controller:"mainController"
	})
	.state("aboutus",{
		url:"/aboutus",
		templateUrl : "html/pages/aboutus.html"
	})
	.state("login", {
		url : "/login",
		templateUrl : "html/pages/login.html",
		controller: "loginController"
	});

}]);