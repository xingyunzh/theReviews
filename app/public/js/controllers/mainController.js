app.controller('mainController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.loginButtonShow = $rootScope.token == undefined;
	$scope.projects = [{
		name:"Artificial Robot",
		ownername:"Mike K",
		description:"This is a sample project to utilize the technology of AI.",
		imageUrl:"/images/boycoding.png"
	},
	{
		name:"Artificial Robot",
		ownername:"Mike K",
		description:"This is a sample project to utilize the technology of AI.",
		imageUrl:"/images/boycoding2.jpg"
	},
	{
		name:"Artificial Robot",
		ownername:"Mike K",
		description:"This is a sample project to utilize the technology of AI.",
		imageUrl:"/images/boycoding.png"
	},
	{
		name:"Artificial Robot",
		ownername:"Mike K",
		description:"This is a sample project to utilize the technology of AI.",
		imageUrl:"/images/code.jpg"
	},
	{
		name:"Artificial Robot",
		ownername:"Mike K",
		description:"This is a sample project to utilize the technology of AI.",
		imageUrl:"/images/boycoding2.jpg"
	}];
	
	$scope.logout = function(){
		$rootScope.token = null;
		$rootScope.user = null;

		$scope.loginButtonShow = true;
	}
}]);