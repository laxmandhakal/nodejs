const express = require('express');

const router = express.Router();

const { mongoClient, contxt, db_name, collections } = require("./../configuration/configure")
    //sub route is defined here


router.get('/', function(req, res, next) {

    res.render('login.pug', {
        title: 'javascript',
        msg: 'welcome to javascript'
    });
});

router.post('/', function(req, res, next) {
    console.log("at post /")
    mongoClient.connect(contxt, { useUnifiedTopology: true }, function(err, client) {
        if (err) {
            next(err)
        }
        client.db(db_name).collection(collections).find({ username: req.body.username, password: req.body.password })
            .toArray(function(err, done) {
                if (err) {
                    next(err)
                }
                res.json(done)
                client.close()
            })

    })
})

router.post('/register', function(req, res, next) {
    console.log("At post register");
    mongoClient.connect(contxt, { useUnifiedTopology: true }, function(err, client) {
        if (err) {
            return next(err)
        }
        const Neddata = {
            username: req.body.name || req.body.fullname || "Laxman Dhakal",
            password: req.body.password ||
                req.body.userid || "password",
            ...req.body
        }
        var db = client.db(db_name)
        db.collection(collections).insertOne(Neddata, function(err, done) {
            if (err) {
                return next(err)
            }
            res.status(200)
            res.json(done)
            client.close();
        })

    })

})
module.exports = router;