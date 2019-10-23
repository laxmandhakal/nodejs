const express = require('express');
const morgan = require('morgan');
const app = express(); // now this app constant hold entire express framework
var path = require('path');
app.set('port', 9090)
var port = app.get('port');

// template engine setup
app.set('view-engine', require('pug'));
app.set('views', path.join(__dirname, 'views'));
// load routng level middleware
const authRoute = require('./controllers/auth.route');
const userRoute = require('./controllers/user.route');
const commentRoute = require('./controllers/comment.route');

// application level middleware
const authentication = require('./middlewares/authenticate');
const authorization = require('./middlewares/authorize');
// load third party middleware
app.use(morgan('dev'));

// laod inbuilt middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// console.log('__dir name >>>', __dirname);

app.use(express.static('files')); // internally view file le access garnu paryo vane
app.use('/file', express.static(path.join(__dirname, 'files'))); // external client endpoint provided to  view file



// app.use(authentication);
// app.use(authorization);

app.use('/auth', authRoute);
app.use('/user', authentication, userRoute);
app.use('/review', authentication, authorization, commentRoute);
app.use('/comment', commentRoute);
app.use('/notification', commentRoute);

app.use(function(req, res, next) {
    console.log('application level middleware below routiing configureation');
    // res.json({
    //     msg: "I am 404 Error Handler "
    // })
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


// global keyword in nodejs
// process, global, __dirname, __filename


// middleware middleware is a function that has access to http request object http response object
// and next middleware refrence
// middleware can access and modify http request object
// middleware can access and modify http response object
// middleware came into action in between http request response cycle
// http request response cycle
// MIDDLEWARE ko order is very important
// syntax
// function(req,res,next){
// // 1st argument is http request object
// // 2nd argument is http response object
// // 3rd argument is next middleware refrence
// }

// configuration 
// app.use() // app.use is configuration block for middleware

// types of middleware
// application level middleware
// routing level middleware
// third party middleware
// inbuilt middleware
// error handling middleware