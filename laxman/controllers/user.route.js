const express = require("express")
const router = express.Router();
const { mongodb, mongoClient, contxt, db_name, collections } = require("./../configuration/configure")
const mongoId = mongodb.ObjectID

function connect(cb) {
    mongoClient.connect(contxt, { useUnifiedTopology: true }, function(err, client) {
        if (err) {
            cb(err)
        }
        var dbData = client.db(db_name).collection(collections)
        cb(null, dbData)
    })
}
router.get("/", function(req, res, next) {
    console.log("At empty route user")
    connect(function(err, data) {
        if (err) {
            return next(err)
        }
        data.find().toArray(function(err, done) {
            if (err) {
                return next(err)
            }
            res.json(done)
            client.close()
        })
    })

})


router.route('/:id')
    .get(function(req, res, next) {
        console.log("at id route")
        connect(function(err, data) {
            if (err) {
                return next(err)
            }
            data.find({ _id: new mongoId(req.params.id) }).toArray(function(err, done) {
                if (err) {
                    return next(err)
                }
                res.json(done)
                client.close()
            })
        })

    })

.put(function(req, res, next) {
        console.log("at update")
        connect(function(err, data) {
            if (err) {
                return next(err)
            }
            data.update({
                    _id: new mongoId(req.params.id)
                }, { $set: req.body },
                function(err, done) {
                    if (err) {
                        return next(err)
                    }
                    res.json(done)
                    client.close()
                })
        })
    })
    .delete(function(req, res, next) {
        connect(function(err, data) {
            if (err) {
                return next(err)
            }
            data.deleteOne({ _id: new mongoId(req.params.id) }, (function(err, done) {
                if (err) {
                    return next(err)
                }
                res.json(done)
                client.close()
            }))
        })
    });


module.exports = router;