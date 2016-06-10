app.service('teamService', function (httpHelper) {
	this.createTeam = function (team) {
		 return httpHelper.sendRequest("POST",  "/api/team/create", team);
	}	

	this.getAllTeams = function () {
		 return httpHelper.sendRequest("GET", "/api/team/getall");
	}

	this.getByUser = function (userId) {
		 return httpHelper.sendRequest("GET", "/api/team/getbyuser/"+userId);
	}

	this.updateTeamById = function (teamId, content) {
		 var data = {
		 	updateContent:content
		 };

		 return httpHelper.sendRequest("POST", "/api/team/updatebyid/"+teamId, data);
	}
});