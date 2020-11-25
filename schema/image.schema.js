let mongoose = require('mongoose');
let schema = mongoose.Schema({
    image:{type:String}
});

let Model = mongoose.model('images', schema);

module.exports = Model;