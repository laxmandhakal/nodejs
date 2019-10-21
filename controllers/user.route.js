
const router = require('express').Router();

router.route('/')
    .get(function (req, res, next) {
        // res.json({
        //     msg:'from empty route of user file'
        // })
        next();
    })
    .post(function (req, res, next) {

    })
    .put(function (req, res, next) {

    })
    .delete(function (req, res, next) {

    });
router.route('/profile')
    .get(function (req, res, next) {
        res.json({
            msg:'from profile route of user file'
        })
    })
    .post(function (req, res, next) {

    })
    .put(function (req, res, next) {

    })
    .delete(function (req, res, next) {

    });
router.route('/change-password')
    .get(function (req, res, next) {
        res.json({
            msg:'from change password route of user file'
        })
    })
    .post(function (req, res, next) {

    })
    .put(function (req, res, next) {

    })
    .delete(function (req, res, next) {

    });


module.exports = router;