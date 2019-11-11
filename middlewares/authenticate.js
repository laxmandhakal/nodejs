const jwt = require('jsonwebtoken');
const config = require('./../config');
const UserModel = require('./../models/user.model');
module.exports = function(req, res, next) {
    console.log('req.headers', req.headers);

    // next();
    var token;
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token']
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization']
    }
    if (req.headers['token']) {
        token = req.headers['token']
    }
    if (token) {
        jwt.verify(token, config.jwtSecret, function(err, decoded) {
            if (err) {
                return next(err);
            }
            console.log('token verified >>', decoded);
            UserModel.findById(decoded.id, function(err, user) {
                if (err) {
                    return next(err);
                }
                if (user) {
                    req.loggedInUser = user;
                    return next();
                } else {
                    next({
                        msg: 'User removed from system'
                    })
                }
            })
        })
    } else {
        next({
            msg: 'token not provided'
        })
    }
}