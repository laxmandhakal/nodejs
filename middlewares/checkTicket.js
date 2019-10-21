module.exports = function (req, res, next) {

    if (!req.ticket) {
        return next();
    } else {
        res.send('you dont have ticket');
    }
}