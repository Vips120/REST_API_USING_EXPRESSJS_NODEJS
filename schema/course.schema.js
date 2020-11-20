let mongoose = require('mongoose');

let courseSchema =  mongoose.Schema({
    name:{type:String, min:3, max:100, required:true}
});

let courseModel = mongoose.model('courses', courseSchema);

module.exports = courseModel;
