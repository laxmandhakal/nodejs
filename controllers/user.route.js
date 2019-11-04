const router = require('express').Router();
const UserModel = require('./../models/user.model');
// task optional (try to implement server side pagination)
// given pageNumber and limit comes in req.query 
const map_user = require('./../helpers/user.map');
router.route('/page/:id')
    .get(function(req, res, next) {
        if (isNaN(req.params.id) == true) {
            return next("not a number")
        }
        let k = Number(req.params.id)
        console.log(typeof(req.params.id))
        let b = k - 1


        UserModel
            .find({

            })
            .sort({ id: -1 })
            .skip(b)
            .limit(1)
            .exec(function(err, users) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(users);
            })


    })

router.route('/:id')
    .get(function(req, res, next) {
        UserModel.findOne({
            _id: req.params.id
        }, function(err, done) {
            if (err) {
                return next(err);
            }
            res.json(done);
        })
    })

.put(function(req, res, next) {
        UserModel.findById(req.params.id)
            .exec(function(err, user) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next({
                        msg: "User not found"
                    })
                }
                // update
                console.log(' logged in user is >>', req.loggedInUser);
                var updatedMapUser = map_user(user, req.body);
                updatedMapUser.updatedBy = req.loggedInUser.username;
                updatedMapUser.save(function(err, done) {
                    if (err) {
                        return next(err)
                    }
                    res.json(done);
                })
            })
    })
    .delete(function(req, res, next) {
        if (req.loggedInUser.role !== 1) {
            return next({
                msg: 'you dont have access'
            })
        }
        UserModel.findById(req.params.id)
            .exec(function(err, user) {
                if (err) {

                    return next(err);
                }
                if (user) {
                    user.remove(function(err, done) {
                        if (err) {
                            return next(err);
                        }
                        res.json(done);
                    })
                } else {
                    next({
                        msg: 'User not found'
                    })
                }
            })
    });
router.route('/change-password')
    .get(function(req, res, next) {
        res.json({
            msg: 'from change password route of user file'
        })
    })
    .post(function(req, res, next) {

    })
    .put(function(req, res, next) {

    })
    .delete(function(req, res, next) {

    });


module.exports = router;