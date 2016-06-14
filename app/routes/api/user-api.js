var express = require("express");
var router = express.Router();

var auth = require("../../authenticator/auth");

var con = require("../../controllers/user-controller");


router.get('/getall',con.getAll);



router.get('/getbyemail/:email', auth.authenticator,con.getByEmail);

router.get('/getbyid/:id', con.getById);

router.get('/getbyusername/:username', con.getByUsername);

router.get('/deletebyid/:id', con.deleteById);

router.post('/add', con.add);

router.post('/updateprofile', auth.authenticator, con.updateProfile);

router.get('/getbykeyword/:keyword', con.getByKeyword);


module.exports = router;