const express = require('express');
const morgan = require('morgan');
const app = express(); // now this app constant hold entire express framework
var path = require('path');
app.set('port', 3000)
var port = app.get('port');

// template engine setup
app.set('view-engine', require('pug'));
app.set('views', path.join(__dirname, 'views'));
// load routng level middleware
const authRoute = require('./controllers/auth.route');
const userRoute = require('./controllers/user.route');



// load third party middleware
app.use(morgan('dev'));

// laod inbuilt middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use(function(req, res, next) {
    console.log('application level middleware below routiing configureation');

    next('404');
});

app.use(function(err, req, res, next) {
    console.log('i am error handling  middleware', err);
    res.json({
        msg: 'from error handling middleware laxman',
        err: err
    })
});

app.listen(port, function(err, done) {

    if (err) {
        console.log('server listening failed');
    } else {
        console.log('server listening at port ' + port);
        console.log('press CTRL +C to exit');
    }
})