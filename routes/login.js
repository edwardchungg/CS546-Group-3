const express = require("express");
const router = express.Router();
const data = require("../data");
const userdata = data.users;

router.get("/", async (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.render("pages/login");
});

router.post("/", async (req, res) => {
  let User = JSON.parse(JSON.stringify(req.body));

  if (!req.body) {
    res.status(400).json({ error: "You must provide body" });
    return;
  }
  if (!User.username) {
    res.status(400).json({ error: "Email cant be empty" });
    return;
  }
  if (!User.password) {
    res.status(400).json({ error: "Password cant be empty" });
    return;
  }
  try {
    User.username = User.username.toLowerCase();
    if (await userdata.checkUser(User.username, User.password)) {
      req.session.user = await userdata.getUserByUname(User.username);
      res.cookie("name", "auth_cookie");
      res.redirect("/private");
    } else {
      res.redirect("auth/login");
     
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

module.exports = router;
