const express = require('express');

const router = express.Router();

//sub route is defined here
router.get('/', function (req, res, next) {
    res.send('i am at empty route of auth file');
});

router.post('/', function (req, res, next) {

})
router.delete('/', function (req, res, next) {

});

router.put('/', function (req, res, next) {

})



module.exports = router;