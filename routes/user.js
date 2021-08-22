const express = require('express');
const router = express.Router();
const usersData = require('../data/users');
const bcrypt = require('bcrypt');


// login page - existing user

router.post("/login", async (req, res) => {
  // try {
    if (typeof req.body.username !== 'string') return res.json({error: `Username must be a string and is casesensitive `});
    if (typeof req.body.password !== 'string') return res.json({error: `Password must be a string and greater than 6 charatcer`});

    let user = await usersData.getByUsername(req.body.username);
    if (user === null) {
      return res.json({error: 'Invalid Username'});
    }else{
      let match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.json({error: 'Incorrect password'});
      }
      // user visibility 
      req.session.user = user;
      res.json({ user }); 
    }
    
  // } catch(e) {
    // res.status(500).send();
  // }
})

// Register - new User

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, username, userRole, address, password } = req.body;
    const newUser = req.body
    let errors = [];
    if (!firstName || !lastName || !email || !username || !userRole || !address || !password) {
        errors.push({ msg: "All field are require! Please fill in all fields" })
    }

    //check if password is more than 6 characters
    if (password.length < 6) {
        errors.push({ msg: 'password atleast 6 characters' })
    }
    if (errors.length > 0) {
        res.render('register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            userRole: userRole,
            address: address,
        })
    } else {
        //validation passed
        let existEmail = await usersData.getByEmail(email);
            if (existEmail) {
                errors.push({ msg: 'email already registered' });
                render(res, errors,  username, email, password);

            } else {
            
                    let user = await usersData.create(newUser);
                    req.session.user = user;
                    res.json({ user });    
             }
    }
  } catch(e) {
    res.status(500).send();
  }
})



module.exports = router;