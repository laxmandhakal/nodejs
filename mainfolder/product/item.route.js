const itemModel = require('./itemmodel');
const fs = require('fs');
const multer = require("multer")
const path = require('path');
const diskStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './file')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

function filter(req, file, cb) {
    var mimeType = file.mimetype.split('/')[0];
    if (mimeType == 'image') {
        cb(null, true);
    } else {
        req.fileErr = true;
        cb(null, false)
    }

}
const upload = multer({
    storage: diskStorage,
    fileFilter: filter
});
const express = require('express');
const router = express.Router();

const map_product_req = require("./configure")

module.exports = function() {


    router.route('/')
        .get(function(req, res, next) {
            itemModel
                .find({
                    user: req.loggedInUser._id
                }, {
                    name: 0,
                    category: 0
                })
                .populate('user', {
                    username: 1
                })
                .exec(function(err, products) {
                    if (err) {
                        return next(err);
                    }
                    console.log('data >>>', products.length);
                    res.status(200).json(products);
                })
        })
        .post(upload.single('img'), function(req, res, next) {
            console.log('req.body >>', req.body);
            console.log('req.file', req.file);

            if (req.fileErr) {
                return next({
                    msg: 'invalid file format'
                })
            }
            if (req.file) {

                req.body.image = req.file.filename;
            }
            var newProduct = new itemModel({});
            var newMappedProduct = map_product_req(newProduct, req.body);
            newMappedProduct.user = req.loggedInUser._id;
            newMappedProduct.save(function(err, saved) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(saved);
            });
        });
    router.route('/search')
        .get(function(req, res, next) {
            var condition = {};
            var searchCondition = map_product_req(condition, req.query);
            search(searchCondition)
                .then(function(data) {
                    res.json(data);
                })
                .catch(function(err) {
                    next(err);
                })
        })
        .post(function(req, res, next) {
            var condition = {};
            var searchCondition = map_product_req(condition, req.body);
            if (!req.body.warrentyStatus) {
                delete searchCondition.warrenty;
            }
            if (!req.body.discountedItem) {
                delete searchCondition.discount
            }
            console.log('search condition >>', searchCondition);
            search(searchCondition)
                .then(function(data) {
                    res.json(data);
                })
                .catch(function(err) {
                    next(err);
                })
        })

    router.route('/:id')
        .get(function(req, res, next) {
            itemModel.findById(req.params.id)
                .exec(function(err, product) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json(product);
                });
        })
        //"img"=key value
        .put(upload.single('img'), function(req, res, next) {
            console.log('req.body <>>>', req.body)
            console.log('req.file <>>>', req.file)
            if (req.fileErr) {
                return next({
                    msg: 'invalid file format'
                });
            }
            itemModel.findById(req.params.id)
                .exec(function(err, product) {
                    if (err) {
                        return next(err);
                    }
                    if (!product) {
                        return next({
                            msg: 'Product not  found here'
                        });
                    }
                    var oldImage = product.image;
                    if (req.file) {
                        req.body.image = req.file.filename;
                    }
                    let updatedMapProduct = map_product_req(product, req.body);
                    if (req.body.ratingMsg && req.body.ratingPoint) {
                        updatedMapProduct.reviews.push({
                            user: req.loggedInUser._id,
                            message: req.body.ratingMsg,
                            point: req.body.ratingPoint
                        });
                    }
                    updatedMapProduct.save(function(err, updated) {
                        if (err) {
                            return next(err);
                        }
                        if (req.file) {
                            fs.unlink(path.join(process.cwd(), 'files/images/' + oldImage), function(err, done) {
                                if (err) {
                                    console.log('file removed err ', err);
                                } else {
                                    console.log('removed');
                                }
                            });
                        }
                        res.status(200).json(updated);
                    })
                })
        })
        .delete(function(req, res, next) {
            itemModel.findById(req.params.id)
                .exec(function(err, product) {
                    if (err) {
                        return next(err);
                    }
                    if (product) {
                        product.remove(function(err, removed) {
                            if (err) {
                                return next(err);
                            }
                            res.status(200).json(removed);
                        })
                    } else {
                        next({
                            msg: " item not found"
                        });
                    }
                });
        });




    function search(query) {
        return new Promise(function(resolve, reject) {
            itemModel.find(query)
                .exec(function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result)
                    }
                });
        })
    }

    return router;

}