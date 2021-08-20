const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');



router.get('/', async (req, res) => {
	//res.render('auth/signup');
});


router.post('/',  async (req, res, next) => {


    //res.redirect("auth/login");
})


module.exports = router;