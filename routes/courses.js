let express = require('express');
let router = express.Router();
let Joi = require("joi"); 
let Course = require('../schema/course.schema');
let auth = require('../middleware/auth');
let admin = require('../middleware/admin');

router.get("/courses", async(req,res) => {
    let courses = await Course.find();
   res.send(courses);
});

router.get("/course/:id", async(req,res) => {
   let course = await Course.findById(req.params.id);
   if(!course) {return res.status(403).send({message:"Invalid course id"})};
   res.send({c: course});
});

//create a courses

router.post("/createcourse", async(req,res) => {

 let result =  ValidationError(req.body)   // req.body.name
//    console.log(result);
if(result.error){return res.status(400).send(result.error.details[0].message)}
 let newcourse = new Course({
        name: req.body.name
 });
 let course = await newcourse.save();
 res.send({newcourse: course});
 } );


router.put("/updatecourse/:id", async(req,res) => {
let course = await Course.findById(req.params.id);
if(!course){return res.status(403).send({message:"Invalid course id"})}
 course.name = req.body.name;
 await course.save();
 res.send({message:"course updated", course: course})
});

router.delete("/removecourse/:id", [auth,admin] ,async(req,res) => {
let course = await Course.findByIdAndRemove(req.params.id);
if(!course){return res.status(403).send({message:"Invalid course id"})};
res.send({message:"course removed"});
});


function ValidationError(error){
   let schema = Joi.object({
       name: Joi.string().min(3).max(12).required(),
   });
   
   return schema.validate(error);
}

module.exports = router;
