const express = require("express");
const router = express.Router();
const data = require("../data");
const userdata = data.users;


router.get("/", async (req, res) => {
  if (req.session.user) {
    
    const user = await userdata.getUserById(req.session.user._id);
    const user_info = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userRole: user.userRole,
      address: user.address,
      
    };
    res.render("pages/private", {
      user: user_info,
    });
  } else {
    res.status(500).redirect("/login");
  }
});

module.exports = router;
