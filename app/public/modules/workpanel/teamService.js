app.service('teamService', function (httpHelper) {
	this.createTeam = function (team) {
		 return httpHelper.sendRequest("POST",  "/api/team/create", team);
	}	

	this.getAllTeams = function () {
		 return httpHelper.sendRequest("GET", "/api/team/getall");
	}
});