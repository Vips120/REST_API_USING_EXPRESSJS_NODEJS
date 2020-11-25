let courses = require('../routes/courses');
let genre = require('../routes/genre');
let movie = require('../routes/movie');
let customer = require('../routes/customer');
let userRegister = require('../routes/userRegister');
let auth = require('../routes/auth/user');
let nodemailer = require('../routes/sendmail');
let forgotpassword = require('../routes/forgotpassword');
let imageupload = require('../routes/file.uploads');
let pagination = require('../routes/pagination');

module.exports = function(app){
    app.use('/api', courses);
    app.use('/api', genre);
    app.use('/api', movie);
    app.use('/api', customer);
    app.use('/api', userRegister);
    app.use('/api', auth);
    app.use('/api', nodemailer);
    app.use('/api',forgotpassword);
   app.use('/api', imageupload);
   app.use('/api', pagination);
}