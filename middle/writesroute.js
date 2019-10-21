const express = require('express');
const fs = require("fs")
const router = express.Router();
router.get("/write/:file/:content", function(req, res, next) {
    let news = req.url
    let arr = news.split("/")
    fs.writeFile(arr[2], arr[3], function(err, done) {
        if (err) {
            res.json({ "result": "failure" })
        } else {
            res.json({ "result": "success" })
        }
    })
})
router.post("/write/:file/:content", function(req, res, next) {

})
router.delete("/write/:file/:content", function(req, res, next) {

});

router.put("/write/:file/:content", function(req, res, next) {

})
module.exports = router