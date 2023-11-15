const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const jwtCode = "mohitsaharansakshamdalalmoneybhardwaj";


router.post("/createuser",[body('email').isEmail(),
body('password').isLength({ min: 5 })],async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt  = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
    try {
       await User.create({
        
            name : req.body.name,
            password : secPassword,
            location : req.body.location,
            email : req.body.email,
            
        })
        .then(res.json({success : true}));
    } catch (error) {
       console.log(error) 
       res.status(500).json({success : false});
    }
    
});

router.post("/loginuser",[body('email').isEmail(),
body('password').isLength({ min: 5 })],async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email  = req.body.email;
    try {
        let username = await User.findOne({email : email});
       if(!username){
        return res.status(400).json({errors : "Username and Password doesn't match"});
       }
       const pass = await bcrypt.compare(req.body.password,username.password);
       if(!pass){
        return res.status(400).json({errors : "Username and Password doesn't match"});
       }

       const data = {
          user:{
            id : username.id
          }
       }
       const authToken = jwt.sign(data,jwtCode)

       return res.json({success : true,authToken : authToken});
    } catch (error) {
       console.log(error) 
       res.status(500).json({success : false});
    }
    
});

module.exports = router;

