const express = require("express");
const {
    write,
    Read
} = require("./moduleformainfile")
const app = express();
const morgan = require('morgan');
port = 3000
app.use(morgan('dev'));

function checkFood(req, res, next) {
    console.log('req.brodway >>', req.broadway);
    req.broadway = 'i am brodway infosys nepal';
    next();
}

function checkTicket(req, res, next) {
    console.log('brodway in request >>', req.broadway);
    next();
}
app.get('/read/*', function(req, res) {
    let news = req.url
    console.log(news)
    let arr = news.split("/")
    console.log(req.url, arr)
    Read(arr[2], function(err, done) {
        if (err) {
            res.json({ key: "error" })

        } else {
            res.json({ key: "success>> " + done })

        }
    })

})
app.use(checkFood)
app.use(checkTicket)
app.get('/write/*', function(req, res) {
    let news = req.url

    let arr = news.split("/")
    console.log(req.url, arr)
    write(arr[2], arr[3])
        .then(function(data) {
            res.json({ key: "success" })

        })
        .catch(function(data) {
            res.json({ key: "error" })
        })
})

app.listen(port, function(err, done) {
    if (err) {
        console.log("error", err)
    } else {
        console.log("success", done)
        console.log('server listening at port ' + port);
        console.log('press CTRL +C to exit');
    }
})