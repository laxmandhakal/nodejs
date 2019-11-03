const express = require('express');

const router = express.Router();


//sub route is defined here


router.get('/', function(req, res, next) {

    res.render('login.pug', {
        title: 'javascript',
        msg: 'welcome to javascript'
    });
});

router.post('/', function(req, res, next) {
    console.log('here at post requrst >>>', req.body);
    res.end("end / post")
})
router.delete('/', function(req, res, next) {

});

router.put('/', function(req, res, next) {

})

router.get('/login', function(req, res, next) {
    res.send('i am at login route of auth file');

});

router.post('/login', function(req, res, next) {
    console.log('post login>>>>>>>>>>', req.body);
    res.json({
        msg: 'form post login'
    })
})
router.delete('/login', function(req, res, next) {

});

router.put('/login', function(req, res, next) {

})

router.get('/register', function(req, res, next) {
    res.send('i am at register route of auth file');

});

router.post('/register', function(req, res, next) {
    console.log('__dir name >>>', __dirname);

    console.log('i am at post request of register', req.body);
    res.json({
        msg: 'form post register'
    })
})
router.delete('/register', function(req, res, next) {

});

router.put('/register', function(req, res, next) {

})

router.get('/write/:fileName/:content', function(req, res, next) {
    console.log('req.url parameter >>', req.params);
    console.log('dynamic end point');
    res.json(req.params)
})

module.exports = router;