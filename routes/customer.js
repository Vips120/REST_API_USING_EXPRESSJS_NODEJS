let express = require('express');
let router = express.Router();
let Joi = require('Joi');
let Movie = require('../schema/movie.schema');
let Customer = require('../schema/customer.schema');
let Fawn = require('fawn');

router.post('/customer', async(req,res) => {
 let {error} = Validationerror(req.body);
 if(error){return res.status(400).send(error.details[0].message)};
 let movie = await Movie.movieModel.findById(req.body.movieId);
 if(!movie){return res.status(403).send({message:"invalid movie id"})};
let newcustomer = new Customer({
    username:req.body.username,
    phone: req.body.phone,
    movie:{
        name:movie.name,
        price: movie.price,
        genre: movie.genre,
        numberStocks: movie.numberStocks
    }
});
try {
    new Fawn.Task()
    .save('customers',newcustomer)
    .update('movies', {_id: movie._id}, {
      $inc:{
          numberStocks:-1
      }  
    })
    .run();
res.send({c: newcustomer});
}

catch(error){
    res.status(500).send("Internal server error");
}


// let customer= await newcustomer.save();
// movie.numberStocks--;
// await movie.save();
// res.send({c: customer});

});

function Validationerror(error){
    let schema = Joi.object({
        username: Joi.string().required(),
        phone: Joi.string().required(),
        movieId: Joi.string().required()
    });

    return schema.validate(error);
}


module.exports = router;

//_id:5fb528a0471f7c35c40e1877
//12 bytes
// 4 bytes: timestamp
//3 bytes: machine identifier
//2 bytes: process identifier
// 3 bytes: counter