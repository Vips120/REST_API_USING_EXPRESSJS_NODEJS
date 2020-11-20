
let express = require('express');
let mongoose = require('mongoose');
// console.log(express);
let app = express();
let helmet = require('helmet');
let morgan = require('morgan');
let Fawn = require('fawn');
app.use(express.json()); 
app.use(express.static('public'));
app.use(helmet());


let middlewareWork = require('./middleware/middleware');
let config = require('config');
let port = process.env.PORT || 4200;
 
//  console.log(process);

let courses = require('./routes/courses');
let genre = require('./routes/genre');
let movie = require('./routes/movie');
let customer = require('./routes/customer');
let userRegister = require('./routes/userRegister');
let auth = require('./routes/auth/user');
const fawn = require('fawn');

console.log(`mode: ${process.env.NODE_ENV}`);
console.log(`default mode: ${app.get('env')}`);
if(app.get('env') === "development"){
    app.use(morgan('tiny'));
}
if(!config.get('APP_KEY')){
    console.error('SERVER FATAL ERROR!!! APP_KEY is not defined');
    process.exit(1);
}

app.use(morgan('tiny'));
console.log(`default config: ${config.get('name')}`);
console.log(`mode_Email: ${config.get('email')}`);
// console.log(`password: ${config.get("password")}`)

 app.use('/api', courses);
 app.use('/api', genre);
 app.use('/api', movie);
 app.use('/api', customer);
 app.use('/api', userRegister);
 app.use('/api', auth);

//connection
mongoose.
connect('mongodb://localhost:27017/weekdays_db',{ useNewUrlParser: true,useUnifiedTopology: true })
.then(() => console.log(`connected to db`))
.catch((error) => console.log(`something went wrong, ${error.message}`))

fawn.init(mongoose);
//express connection
app.listen(port,() => console.log(`conneted to port ${port}`));




