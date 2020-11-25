let express = require('express');
let router = express.Router();
let User = require('../schema/user');
let Joi = require('joi');
let crypto = require('crypto');
let nodemailer = require('nodemailer');

router.post('/nodemailer', async(req,res) => {
  let user = await User.UserModel.findOne({"UserLogin.emailId": req.body.UserLogin.emailId});
  if(!user){return res.status(403).send({message:"Invalid email id"})};
  let token = crypto.randomBytes(35).toString("hex");
   user.resetpasswordtoken = token;
   user.resetpasswordexpires = Date.now() + 36000000  // 1 hours
   await user.save();


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '-', // generated ethereal user
      pass: '-', // generated ethereal password
    },
  });

  let mailoptions = {
   
        from: '"Fred Foo 👻" <wynebatman@gmail.com>', // sender address
        to: user.UserLogin.emailId, // list of receivers
        subject: "change the password", // Subject line
        text: "open this link to change your password http://localhost:4200/forgotpassword/" + token, // plain text body
  };
transporter.sendMail(mailoptions, (error,info) => {
      if(error){return console.error(error)}
      else {
          console.log(`message sent: ${info.messageId}`);
      }
});

res.send({message:"please check your email", u: user});
//wwww.xyz.com/forgotpassword/sfdsfdsfdsfdsfdsfdsfdsfsdfdsf

});

module.exports = router; 