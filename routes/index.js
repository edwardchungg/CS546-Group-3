const express = require('express');
const router  = express.Router();
//welcome page
router.get('/', (req,res)=>{
    res.render('welcome');
})
// login page
router.get('/auth/login', (req,res)=>{
    res.render()
})
//register page
router.get('/auth/signup', (req,res)=>{
    res.render('register');
})

module.exports = router; 
