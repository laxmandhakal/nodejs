const express = require('express');
const morgan = require('morgan');
const app = express();
var port = 3000;

// load routng level middleware
const writeFil = require('./middle/writesroute');
const readFil = require('./middle/readsroute');
//application level middleware
const userId = require('./application/userid')
const password = require('./application/password')
    //third party middleware
app.use(morgan('dev'));
app.use(function(req, res, next) {
    console.log('application level middleware top of main file');

    next()
});
//routing
app.use("/", readFil);
app.use("/", writeFil);
//application level 
app.use("/login", userId, password)
app.use(function(req, res, next) {
    console.log('application level middleware below routiing configureation');
    res.json({
        msg: "I am 404 Error Handler "
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