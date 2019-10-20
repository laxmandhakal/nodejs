const express = require('express');
const morgan = require('morgan');
const app = express(); // now this app constant hold entire express framework
var port = 9090;
// load third party middleware
app.use(morgan('dev'));
// application level middleware
//  middleware where req and response object are accessed in the application are application level middleware
function checkFood(req, res, next) {
    console.log('req.brodway >>', req.broadway);
    req.broadway = 'i am brodway infosys nepal';
    next();
}

function checkTicket(req, res, next) {
    console.log('brodway in request >>', req.broadway);
    next();
}

app.get('/koteshwor', function(req, res) {
    console.log('i am at koteshowr route');
    res.json({
        key: 'koteshwor'
    })
});

app.use(checkFood)
app.use(checkTicket)
app.get('/baneshwor', function(req, res) {
    console.log('i am at baneshwor  get route');
    res.json({
        key: 'from  baneshowor get route'
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