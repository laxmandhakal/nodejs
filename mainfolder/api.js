// load routng level middleware
const authnRoute = require('./user.author/authn.rout');
const userRoute = require('./user.author/user.route');
const itemRoute = require('./product/item.route')();

//application level middleware
const authenticate = require('./user.author/authen');
app = require("express")()
module.exports = function() {
    app.use('/authn', authnRoute);
    app.use('/user', authenticate, userRoute);
    app.use('/item', authenticate, itemRoute);
    return app
}