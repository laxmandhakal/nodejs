
module.exports = function (req, res, next) {
    if(req.food){
        delete req.food;
    }
    return next();
}