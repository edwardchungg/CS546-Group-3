const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');



router.get('/', async (req, res) => {
    /* render a view with a login form for a username and password */


	//res.render('auth/login');
});



router.post('/', async (req, res) => {
    /*attempt to log in a use with the login form */

    //res.render('auth/login');
});



module.exports = router;