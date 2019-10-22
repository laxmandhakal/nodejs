
module.exports = function (req, res, next) {
    if (req.query.token) {
        return next();
    } else {
        return next({
            msg: 'you dont have token'
        });
    }
}