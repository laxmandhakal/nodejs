const express = require('express');
const morgan = require('morgan');
const app = express();
var path = require('path');

app.set('port', 9090)
var port = app.get('port');
//middleware section
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//execution
require('./dbconnect');
api = require("./api")()
app.use("/api", api)
app.use(function(req, res, next) {
    console.log('application level middleware below routiing configureation');
    next('404');
});

app.use(function(err, req, res, next) {
    console.log('i am error handling middleware', err);
    res.json({
        msg: 'from error handling middleware',
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