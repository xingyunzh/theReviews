var apiRouter = require("../routes/api/api-router");
var auth = require("../authenticator/auth");


exports.setupRouters = function(app) {
	app.use('/auth',auth.router);
    app.use('/api', apiRouter);
}