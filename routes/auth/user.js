let express = require('express');
let router = express.Router();
let User = require('../../schema/user');
let Joi = require('Joi');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let config = require('config');
router.post('/auth', async(req,res) => {
 let {error} = ValidationError(req.body);
 if(error){return res.status(400).send(error.details[0].message)};
 let email = await User.UserModel.findOne({"UserLogin.emailId": req.body.UserLogin.emailId});
 if(!email){return res.status(403).send({message:"Invalid email Id"})};
//  let password = await User.findOne({"UserLogin.password": req.body.UserLogin.password});
let password = await bcrypt.compare(req.body.UserLogin.password, email.UserLogin.password);
console.log(password);
 if(!password){return res.status(403).send({message:"Invalid password"})};
 let token = email.genrateAuthToken();
 res.header('x-auth-token', token).send({message:"Login Done!!!!",token: token});

});

function ValidationError(error){
    let schema = Joi.object({
        UserLogin:{
            emailId: Joi.string().required().email(),
            password: Joi.string().required()
        }
    });

    return schema.validate(error);

}



module.exports = router;

