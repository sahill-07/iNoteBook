const express = require("express");
const router = express.Router();
const User = require("../models/User.models");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRECT = "SahilToken"
const fetchUser = require('../middleware/fetchUser.js')


router.post(
  "/createUser",
  [
    body("name", "Name should not be empty").isLength({ min: 1 }),
    body("password", "Password must contain atleast 7 characters").isLength({
      min: 7,
    }),
    body("email", "Enter a valid Password").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ msg: "User already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password , salt);

      user = await User.create({
        name: req.body.name,
        password: securedPassword,
        email: req.body.email,
      });

      const authToken = jwt.sign({
        user:{
            id:user.id
        }
      } , JWT_SECRECT)

      res.status(200).json({ authToken });
    } catch (error) {
        console.log('error : ' , error.message );
        res.status(500).json({ msg: "Some error occured" });
    }
  }
);



router.post(
    "/login",
    [
      body("password", "Password cannot be blank").exists(),
      body("email", "Enter a valid Password").isEmail(),
    ],
    async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email , password} = req.body ;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({msg:"Invalid Credentials"})
            }
            const passwordCompare = await bcrypt.compare(password , user.password);
            if(!passwordCompare){
                return res.status(400).json({msg:"Invalid Credentials"})
            }

            const authToken = jwt.sign({user:{id:user.id}} , JWT_SECRECT);
            res.status(200).json({authToken});

        } catch (error) {
            console.log('error : ' , error.message );
            res.status(500).json({ msg: "Some error occured" }); 
        }


})

router.post('/getUser', fetchUser, async (req, res) => {
  try {
      const userId = req.user.id;
      let user = await User.findById(userId).select("-password");
      
      res.json(user);
  } catch (error) {
      console.log('error:', error.message);
      res.status(500).json({ msg: "Some error occurred" });
  }
});



module.exports = router;
