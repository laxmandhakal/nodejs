const fs = require("fs")
const express = require('express');
const router = express.Router();
router.get("/read/:file", function(req, res, next) {
    let news = req.url
    let arr = news.split("/")
    console.log(news)
    fs.readFile(arr[2], "UTF-8", function(err, done) {
        if (err) {
            res.json({ "result": "failure" })
        } else {
            res.json({ "result success": done })
        }
    })
});

router.post("/read/:file", function(req, res, next) {

})
router.delete("/read/:file", function(req, res, next) {

});

router.put("/read/:file", function(req, res, next) {

})
module.exports = router