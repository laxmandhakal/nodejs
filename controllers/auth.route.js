const express = require('express');

const router = express.Router();

//sub route is defined here


router.get('/', function(req, res, next) {
    console.log(req.url)
    console.log('req.query >>', req.query);
    res.json(req.query);
});

router.post('/', function(req, res, next) {

})
router.delete('/', function(req, res, next) {

});

router.put('/', function(req, res, next) {

})

router.get('/login', function(req, res, next) {
    res.send('i am at login route of auth file');

});

router.post('/login', function(req, res, next) {

})
router.delete('/login', function(req, res, next) {

});

router.put('/login', function(req, res, next) {

})

router.get('/register', function(req, res, next) {
    res.send('i am at register route of auth file');

});

router.post('/register', function(req, res, next) {

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