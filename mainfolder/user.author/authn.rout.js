const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('./usermodel');
//sub route is defined here
const config = require("./../configuration")

router.get('/all', function(req, res, next) {
    UserModel.find({})
        .sort({ _id: -1 })
        .exec(function(err, user) {
            if (err) {
                return next(err);
            }
            res.json(user)
        })
})


router.post('/login', function(req, res, next) {
    console.log('here at post requrst >>>', req.body);

    UserModel.findOne({
            username: req.body.username
        })
        .exec(function(err, user) {
            if (err) {
                return next(err);
            }
            if (user) {

                var isMatch = bcrypt.compare(req.body.password, user.password);
                if (isMatch) {
                    var token = jwt.sign({ id: user._id }, config.jwtSecret);
                    res.status(200).send({
                        user: user,
                        token: token
                    });
                } else {
                    next({
                        msg: 'invalid username or password'
                    });
                }
            } else {
                next({
                    msg: 'invalid username or password'
                });
            }
        })


})
router.get('/register', function(req, res, next) {});

router.post('/register', function(req, res, next) {
    console.log('i am at post request of register', req.body);
    var newUser = new UserModel({});
    var newMappedUser = config.map_user_req(newUser, req.body);
    console.log('new user >>', newUser);
    bcrypt.hash(req.body.password, 10, function(err, done) {
        if (err) {
            return next(err)
        }
        newMappedUser.password = done
        newMappedUser.save(function(err, done) {
            if (err) {
                return next(err);
            }
            res.status(200).json(done);
        })
    });


});

module.exports = router;