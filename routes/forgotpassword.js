let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let User = require('../schema/user');

router.post('/forgotpassword/:token', async(req,res) => {
    let user = await User.UserModel.findOne({
        "resetpasswordtoken":req.params.token,
        "resetpasswordexpires":{
            $gt: Date.now()
        }
    });

    if(!user){return res.status(403).send({message:"Invalid token or token get expires"})};
    let oldpassword = await bcrypt.compare(req.body.UserLogin.password, user.UserLogin.password);
    if(oldpassword){return res.status(400).send({message:"old password, please try to create new password"})};
   user.UserLogin.password = req.body.UserLogin.password;
   user.resetpasswordtoken=undefined;
   user.resetpasswordexpires = undefined;
   let salt = await bcrypt.genSalt(10);
   user.UserLogin.password = await bcrypt.hash(user.UserLogin.password, salt);
   await user.save();
   res.send({message:"Password updated"});
});

module.exports = router;

/***
 * 
 * let a = {
 * name:vipul
 * };
 * 
 * let b = a;
 *  b.name = "john"
 * console.log(a.name);
 * console.log(b.name);
 * 
 
 * 
 */