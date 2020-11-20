let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let User = require('../schema/user');
let Joi = require('Joi');
let jwt = require('jsonwebtoken');
let config = require('config');
router.post('/register', async(req,res) => {
  let {error} = User.ValidationError(req.body);
  if(error){return res.status(400).send(error.details[0].message)};
  let user = await User.UserModel.findOne({"UserLogin.emailId": req.body.UserLogin.emailId});
  if(user){return res.status(401).send({message:"email id already exists"})};
   newUser = new User.UserModel({
       firstname: req.body.firstname,
       lastname: req.body.lastname,
        UserLogin: req.body.UserLogin
   });
    let salt = await bcrypt.genSalt(10);
  newUser.UserLogin.password = await bcrypt.hash(newUser.UserLogin.password, salt);
   let saveuser = await newUser.save();

   let token = saveuser.genrateAuthToken();
   //IEP---> information expert principle
   res.send({message:"Registration done!!!",token: token});
    
});
//DRY --> Do not repeat yourself




module.exports = router;
