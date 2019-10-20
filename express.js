const express = require("express");
const {
    write,
    Read
} = require("./moduleformainfile")
const app = express();
const morgan = require('morgan');
<<<<<<< HEAD
port = 9090
=======
port = 3000
>>>>>>> 709d5c73f0c09c601b087ec147658e87b4fa8c60
app.use(morgan('dev'));

function checkFood(req, res, next) {
    console.log('req.brodway >>', req.broadway);
    req.broadway = 'i am brodway infosys nepal';
    next();
<<<<<<< HEAD
};
=======
}
>>>>>>> 709d5c73f0c09c601b087ec147658e87b4fa8c60

function checkTicket(req, res, next) {
    console.log('brodway in request >>', req.broadway);
    next();
<<<<<<< HEAD
};
app.use(checkFood);
=======
}
>>>>>>> 709d5c73f0c09c601b087ec147658e87b4fa8c60
app.get('/read/*', function(req, res) {
    let news = req.url
    console.log(news)
    let arr = news.split("/")
    console.log(req.url, arr)
    Read(arr[2], function(err, done) {
        if (err) {
<<<<<<< HEAD
            res.json({ "result": "error" })

        } else {
            res.json({ "result success content here": done })

        }
    });

});
app.use(checkTicket);
app.get('/write/*/*', function(req, res) {
    let news = req.url
=======
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

>>>>>>> 709d5c73f0c09c601b087ec147658e87b4fa8c60
    let arr = news.split("/")
    console.log(req.url, arr)
    write(arr[2], arr[3])
        .then(function(data) {
<<<<<<< HEAD
            res.json({ "result": "success" })

        })
        .catch(function(data) {
            res.json({ "result": "error" })
        })
});
=======
            res.json({ key: "success" })

        })
        .catch(function(data) {
            res.json({ key: "error" })
        })
})

>>>>>>> 709d5c73f0c09c601b087ec147658e87b4fa8c60
app.listen(port, function(err, done) {
    if (err) {
        console.log("error", err)
    } else {
        console.log("success", done)
        console.log('server listening at port ' + port);
        console.log('press CTRL +C to exit');
    }
<<<<<<< HEAD
});
=======
})
>>>>>>> 709d5c73f0c09c601b087ec147658e87b4fa8c60
