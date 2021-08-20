const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    /*inform the user that they have been logged out and redirect to the "/" page */

	//req.session.destroy();
	res.redirect("/");
});

module.exports = router;