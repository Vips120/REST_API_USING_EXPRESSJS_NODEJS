module.exports = function(mongoose){
    //connection
mongoose.
connect('mongodb://localhost:27017/weekdays_db',{ useNewUrlParser: true,useUnifiedTopology: true })
.then(() => console.log(`connected to db`))
.catch((error) => console.log(`something went wrong, ${error.message}`))

}