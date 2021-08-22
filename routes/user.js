const express = require('express');
const router = express.Router();
const data = require('../data');
const bcrypt = require('bcrypt');
const xss = require('xss');
const saltRounds = 16;
const usersData = data.users;

router.get('/', async (req, res) => {
    if (req.session.user) {
        res.redirect('/post');
    } else {
        res.render('auth/login');
    }
});


router.post("/login", async (req, res) => {
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
      if (await usersData.checkUser(User.username, User.password)) {
        req.session.user = await usersData.getByUsername(User.username);
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

router.post("/register", async (req, res) => {
    let newUser = JSON.parse(JSON.stringify(req.body));
  
    if (!req.body) {
      res.status(400).json({ error: "You must provide body" });
      return;
    }
    if (!newUser.userName) {
      res.status(400).json({ error: "You must provide Username" });
      return;
    }
    if (!newUser.email) {
      res.status(400).json({ error: "You must provide email" });
      return;
    }
    if (newUser.newPassword.length < 8) {
      res.status(400).json({ error: "Your password must has at last 8 digits" });
      return;
    }
    if (newUser.newPassword != newUser.confirmPassword) {
        res.status(400).json({ error: "Comfirm password does not match" });
        return;
      }
    if (!newUser.firstName) {
      res.status(400).json({ error: "You must provide first name" });
      return;
    }
    if (!newUser.lastName) {
      res.status(400).json({ error: "You must provide last name" });
      return;
    }
    if (!newUser.address) {
      res.status(400).json({ error: "You must provide address" });
      return;
    }
    if (!newUser.userRole) {
      res.status(400).json({ error: "You must provide userRole" });
      return;
    }
  
    try {
      // Always converts the email to lowercase
      newUser.email = newUser.email.toLowerCase();
      if (await usersData.emailExists(newUser.email)) {
        res.json({ message: "user already exist." });
      } else {
        await usersData.create(
          xss(newUser.firstName),
          xss(newUser.lastName),
          xss(newUser.email),
          xss(newUser.userName),
          xss(newUser.userRole),
          xss(newUser.address),
          xss(newUser.newPassword),
        );
        req.session.user = await usersData.getByEmail(newUser.email);
        res.cookie("name", "auth_cookie");
        res.redirect("/private");
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

router.get('/:id', async (req, res) => {
    //TODO set cookies to authenticate user
    if (!req.session.user) {
        res.render('/auth/login');
    }
    try {
        let user = await usersData.getUserById(req.params.id); // ID string
        res.render('/auth/userpage', user);  //send user data to the profile page
    } catch (e) {
        res.render('/auth/error', { error: 'User not found' });
    }
});

//user update info
router.patch('/:id', async (req, res) => {
    //TODO set cookies to authenticate user
    if (!req.session.user) {
        res.render('/auth/login');
    }

    try {
        await usersData.getUserById(req.params.id);
    } catch (e) {
        res.render('/auth/error', { error: 'User not found' });
    }
    let userInfo = req.body;
    const updateuser = await usersData.getUserById(req.params.id);
    let updatedInfo = {};
    updatedInfo.email = updateuser.email;
    updatedInfo.password = updateuser.password;
    updatedInfo.firstName = updateuser.firstName;
    updatedInfo.lastName = updateuser.lastName;
    updatedInfo.address = updateuser.address;
    updatedInfo.usreRole = updateuser.userRole;
 
    if (!userInfo) {
        res.render('/auth/error', { error: 'You must at least update one data to a user' });
        let user = await usersData.getUserById(req.params.id); // ID string
        res.render('/auth/userpage', user);  //send user data to the info page
    }
    if (userInfo.username) {
        if (typeof (userInfo.username) != 'string' || userInfo.username.length == 0) {
            res.render('/auth/error', { error: 'you must update a non-empty string username' });
        }
        updatedInfo.username = userInfo.username;
    }
    if (userInfo.email) {
        if (typeof (userInfo.email) != 'string' || userInfo.email.length == 0) {
            res.render('/auth/error', { error: 'you must update a non-empty string email' });
        }
        updatedInfo.email = userInfo.email;
    }
    if (userInfo.password) {
        if (typeof (userInfo.password) != 'string' || userInfo.password.length == 0) {
            res.render('/auth/error', { error: 'you must update a non-empty string password' });
        }
        let newpass = await bcrypt.hash(userInfo.password, saltRounds);
        updatedInfo.password = newpass;
    }
    if (userInfo.firstName) {
        if (typeof (userInfo.firstName) != 'string' || userInfo.firstName.length == 0) {
            res.render('/auth/login', { error: 'provide valide first name' });
    
        }
        updatedInfo.firstName = userInfo.firstName;
    }
    if (userInfo.lastName) {
        if (typeof (userInfo.lastName) != 'string' || userInfo.lastName.length == 0) {
            res.render('/auth/error', { error: 'provide valide last name' });

        }
        updatedInfo.lastName = userInfo.lastName;
    }

    if (userInfo.address) {
        if (typeof (userInfo.address) != 'string' || userInfo.lastName.address == 0) {
            res.render('/auth/error', { error: 'provide valide address' });

        }
        updatedInfo.address = userInfo.address;
    }
    try {
        res.json(await usersData.updateUser(req.params.id,updatedInfo));
      } catch (e) {
        res.sendStatus(500);
      }
});

    router.get('/logout', async (req, res) => {
        req.session.destroy();
        res.render('auth/logout');
        //res.render('/welcome');
    });

    module.exports = router;
