//task express to read and write file by making dynamic
const express = require('express');
const morgan = require('morgan');
const { write, Read } = require("./moduleformainfile");
const app = express(); // now this app constant hold entire express framework
var port = 9090;
app.use(morgan('dev'));

function checkFood(req, res, next) {
    console.log('req.brodway >>', req.broadway);
    req.broadway = 'i am brodway infosys nepal';
    next();
}

function checkTicket(req, res, next) {
    console.log('brodway in res >>', req.broadway);
    next();
}
app.use(checkFood);
app.get("/read/*", function(req, res) {
    let news = req.url
    let arr = news.split("/")
    if (arr[1] == "read") {
        Read(arr[2], function(err, done) {
            if (err) {
                res.json({ "result": "error in read>>" })

            } else {
                res.json({ "Result success in read>>": done })

            }

        })
    }
})
app.use(checkTicket)
app.get("/write/*/*", function(req, res) {
    let news = req.url
    let arr = news.split("/")
    write(arr[2], arr[3])
        .then(function(data) {
            res.json({ "result": "success in write>>" })

        })
        .catch(function(data) {
            res.json({ "result": "error in write>>" })
        })
})
app.listen(port, function(err, done) {
    if (err) {
        console.log('server listening failed');
    } else {
        console.log('server listening at port ' + port);
        console.log('press CTRL +C to exit');
    }
})