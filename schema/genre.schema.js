let mongoose = require('mongoose');

let genreSchema = mongoose.Schema({
    name:{type:String, trim:true,required:true}
});

let GenreModel = mongoose.model('genre', genreSchema);


module.exports = {
    genreSchema,
    GenreModel
};