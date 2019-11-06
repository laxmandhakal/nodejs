module.exports = function (req, res, next) {

    if (req.query.token == 'ram') {
        return next();
    } else {
        next({
            msg: 'invalid token'
        })
    }
}