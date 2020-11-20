let mongoose = require('mongoose');
let Movie = require('../schema/movie.schema');

let schema = mongoose.Schema({
   username:{type:String, required:true},
   phone:{type: String},
   movie:{type:Movie.movieSchema}
});

let CustomerModel = mongoose.model('customers', schema);

module.exports = CustomerModel;