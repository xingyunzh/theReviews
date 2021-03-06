var express = require("express");
var router = express.Router();

var auth = require("../../authenticator/auth");

var con = require("../../controllers/iteration-controller");


router.get('/getall',con.getAll);

router.get('/getbyid/:id', con.getById);

router.get('/getbyname/:name', con.getByName);

router.get('/deletebyid/:id', con.deleteById);

router.post('/create', auth.authenticator, con.create);

router.post('/updatebyid/:id', con.updateById);

module.exports = router;