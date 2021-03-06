var express = require("express");
var router = express.Router();

var auth = require("../../authenticator/auth");

var con = require("../../controllers/project-controller");


router.get('/getall',con.getAll);

router.get('/getbyid/:id', con.getById);

router.get('/getbyname/:name', con.getByName);

router.post('/getbyteams', con.getByTeams);

router.get('/deletebyid/:id', con.deleteById);

router.post('/create', auth.authenticator, con.create);

router.post('/updatebyid/:id', con.updateById);

router.get('/getphasemapping', con.getPhaseMapping);

router.get('/getStateMapping', con.getStateMapping);

module.exports = router;