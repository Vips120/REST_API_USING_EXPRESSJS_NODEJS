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
const fawn = require('fawn');
require('./startup/routes')(app);

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
app.use("/uploads", express.static("uploads"));
require('./startup/db.connection')(mongoose);
fawn.init(mongoose);
//express connection
app.listen(port,() => console.log(`conneted to port ${port}`));




