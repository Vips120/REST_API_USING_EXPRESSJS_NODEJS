let express = require('express');
let router = express.Router();
let Genre = require('../schema/genre.schema');

router.post('/genre', async(req,res) => {
let newgenre = new Genre.GenreModel({
    name: req.body.name
});

await newgenre.save();

res.send({message:"genre created!!!!!"})

});

module.exports = router;