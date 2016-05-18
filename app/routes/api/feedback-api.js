var express = require("express");
var router = express.Router();

var auth = require("../../authenticator/auth");

var con = require("../../controllers/feedback-controller");


router.get('/getall',con.getAll);

router.get('/getalltestview', auth.authenticator, con.getAllTestview);

router.get('/getbyemail/:email', con.getByEmail);

router.get('/getbyid/:id', con.getById);

router.get('/deletebyid/:id', con.deleteById);

router.post('/add', con.add);


module.exports = router;