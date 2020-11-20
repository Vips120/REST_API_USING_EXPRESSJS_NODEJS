let express = require('express');
let router = express.Router();
let Genre = require('../schema/genre.schema');
let Movie = require('../schema/movie.schema');
let Joi = require('joi');

router.post('/movie', async(req,res) => {
let {error} = ValidationError(req.body);
if(error){return res.status(400).send(error.details[0].message)};
let genre = await Genre.GenreModel.findById(req.body.genreId)
if(!genre){return res.status(403).send({message:"Invalid genre id"})};
 let newmovie = new Movie.movieModel({
     name: req.body.name,
     price: req.body.price,
     genre:{
        _id: genre._id,
        name: genre.name
     },
     numberStocks:req.body.numberStocks
 });
 let movie = await newmovie.save();

 res.send({message:"stored the movie data", m: movie});

});

function ValidationError(error){
    let schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        genreId: Joi.string().required(),
        numberStocks:Joi.number().required()
    });
    return schema.validate(error);
}
module.exports = router;