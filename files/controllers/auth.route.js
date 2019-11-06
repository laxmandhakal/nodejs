const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('./../models/user.model');
//sub route is defined here
const config = require('./../config');
const map_user = require('./../helpers/user.map');


router.get('/', function (req, res, next) {
    res.render('login.pug', {
        title: 'javascript',
        msg: 'welcome to javascript'
    });
});

router.post('/', function (req, res, next) {
    console.log('here at post requrst >>>', req.body);
    // db operation here
    // UserModel.findOne({
    //     username: req.body.username,
    //     password: req.body.password
    // }, function (err, user) {
    //     if (err) {
    //         return next(err);
    //     }
    //     if(user){

    //         res.status(200).json(user);
    //     }else{
    //         next({
    //             msg:"invalid login credentials"
    //         })
    //     }
    // })
    // UserModel.findOne({
    //     username: req.body.username
    // })
    //     .then(function (data) {
    //         res.status(200).json(data);
    //     })
    //     .catch(function (err) {
    //         next(err);
    //     })
    UserModel.findOne({
        username: req.body.username
    })
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (user) {
                // user will have hashed password
                // input ma aayeko password pani huncha
                var isMatch = passwordHash.verify(req.body.password, user.password);
                if (isMatch) {
                    var token = jwt.sign({ id: user._id }, config.jwtSecret);
                    res.status(200).json({
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




router.get('/register', function (req, res, next) {


});

router.post('/register', function (req, res, next) {
    console.log('i am at post request of register', req.body);
    var newUser = new UserModel({});
    var newMappedUser = map_user(newUser, req.body);
    console.log('new user >>', newUser);
    // var obj = {name:'brodway'};
    // obj.name = 'infosys';
    newMappedUser.password = passwordHash.generate(req.body.password);
    newMappedUser.save(function (err, done) {
        if (err) {
            return next(err);
        }
        res.status(200).json(done);
    })

});

module.exports = router;