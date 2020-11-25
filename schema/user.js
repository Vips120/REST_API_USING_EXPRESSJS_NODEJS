let mongoose = require('mongoose');
let config = require('config');
let Joi = require('Joi');
let jwt = require('jsonwebtoken');
let schema = mongoose.Schema({
    firstname:{type: String, min:3, max:100, required:true},
    lastname:{type: String,min:3,max:100,required:true},
    UserLogin:{
        emailId:{type: String, required:true, unique:true},
        password:{type: String, required:true}
    },
    isAdmin:{type: Boolean},
    resetpasswordtoken:{type: String},
    resetpasswordexpires:{type: Date}
});
schema.methods.genrateAuthToken = function(){
    return jwt.sign({_id: this._id, isAdmin:this.isAdmin},config.get("APP_KEY"));
}



let UserModel = mongoose.model('users', schema);

function ValidationError(error){
    let schema = Joi.object({
        firstname: Joi.string().required().min(3).max(250),
        lastname: Joi.string().min(3).max(250),
        UserLogin:{
            emailId: Joi.string().required().email(),
            password: Joi.string().required()
        }
    });
    return schema.validate(error);
}

module.exports = {UserModel, ValidationError};