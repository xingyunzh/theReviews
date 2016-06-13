app.service('projectService', function (httpHelper, $q) {

	this.createProject = function(project) {
		/* body... */
		return httpHelper.sendRequest("POST", "/api/project/create", project);
	};

	this.getProjectsByTeams = function(teams) {
		var teamIds = _.map(teams, function(team) {
			return team._id;
		});
		return httpHelper.sendRequest("POST", '/api/project/getbyteams', {teams:teamIds});
	};

	this.getPhaseMapping = function () {
		var deferred = $q.defer();
		if (this.phaseMapping) {
			
			setTimeout(function(){
				 deferred.resolve(this.phaseMapping);
			}, 0);
			
		}else {
			httpHelper.sendRequest('GET', '/api/project/getphasemapping').then(function success(mapping) {
				 this.phaseMapping = mapping;
				 deferred.resolve(mapping);
			}, function fail(argument) {
				 deferred.reject(argument); 
			});
		};

		return deferred.promise;
	};

	this.getStateMapping = function(argument) {
		var deferred = $q.defer();
		if (this.stateMapping) {
			
			setTimeout(function(){
				 deferred.resolve(this.stateMapping);
			}, 0);
			
		}else {
			httpHelper.sendRequest('GET', '/api/project/getstatemapping').then(function success(mapping) {
				 this.stateMapping = mapping;
				 deferred.resolve(mapping);
			}, function fail(argument) {
				 deferred.reject(argument); 
			});
		};

		return deferred.promise;
	};

	this.deleteProject = function (project) {
		 return httpHelper.sendRequest('GET', '/api/project/deletebyid/' + project._id);
	};
});


app.filter("mapping", function(projectService, util) {
	return function(val, mapping) {
		if (mapping == null) {
			return val;
		};
		return util.keyForValue(mapping, val);
	};
});
