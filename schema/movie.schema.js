let mongoose = require('mongoose');
let Genre = require('../schema/genre.schema');
let movieSchema = mongoose.Schema({
    name:{type:String, trim:true,required:true},
    price:{type: Number, required:true},
    genre:{type:Genre.genreSchema,required:true},
    numberStocks:{type: Number, min:0, max:250,required:true}
});

let movieModel = mongoose.model('movies', movieSchema);


module.exports = {
    movieSchema,
    movieModel
};