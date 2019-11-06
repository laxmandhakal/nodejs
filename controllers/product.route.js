const ProductModel = require('./../models/product.model');

const express = require('express');
const router = express.Router();

function map_product_req(product, productDetails) {
    if (productDetails.name)
        product.name = productDetails.name;
    if (productDetails.category)
        product.category = productDetails.category;
    if (productDetails.brand)
        product.brand = productDetails.brand;
    if (productDetails.description)
        product.description = productDetails.description;
    if (productDetails.price)
        product.price = productDetails.price;
    if (productDetails.color)
        product.color = productDetails.color;
    if (productDetails.weight)
        product.weight = productDetails.weight;
    if (productDetails.tags)
        product.tags = Array.isArray(productDetails.tags) ?
        productDetails.tags :
        productDetails.tags.split(',');
    // TODO: check data type of boolean value
    product.warrenty = {};
    // // warrentyStatus: productDetails.warrentyStatus === 'true' ? true : false,
    // // warrentyPeriod: productDetails.warrentyPeriod
    if (productDetails.warrentyStatus == 'true') {
        product.warrenty.warrentyStatus = productDetails.warrentyStatus
    }
    // // infuture 
    // product.warrenty.warrentyStatus = productDetails.warrentyStatus ? true : false;
    if (productDetails.warrentyPeroid) {
        product.warrenty.warrentyPeroid = productDetails.warrentyPeroid
    }

    // if (productDetails.warrentyStatus) {
    //     product.warrenty = {
    //         warrentyStatus: productDetails.warrentyStatus,
    //         warrentyPeroid: productDetails.warrentyPeroid
    //     };
    // }

    product.discount = {
        discountedItem: productDetails.discountedItem === 'true' ? true : false,
        discountType: productDetails.discountType,
        discount: productDetails.discount
    }
    if (productDetails.modelNo)
        product.modelNo = productDetails.modelNo;
    if (productDetails.image)
        product.image = productDetails.image;
    if (productDetails.manuDate)
        product.manuDate = productDetails.manuDate;
    if (productDetails.expiryDate)
        product.expiryDate = productDetails.expiryDate;
    if (productDetails.volume)
        product.volume = productDetails.volume
    if (productDetails.quantity)
        product.quantity = productDetails.quantity;
    if (productDetails.origin)
        product.origin = productDetails.origin;

    return product;
}

module.exports = function(a, b, c) {


    router.route('/')
        .get(function(req, res, next) {
            ProductModel
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
        .post(function(req, res, next) {
            var newProduct = new ProductModel({});
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
            ProductModel.findById(req.params.id)
                .exec(function(err, product) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json(product);
                });
        })
        .put(function(req, res, next) {
            console.log('req.body <>>>', req.body.warrentyStatus)
            console.log('req.body <>>>', typeof(req.body.warrentyStatus))
            ProductModel.findById(req.params.id)
                .exec(function(err, product) {
                    if (err) {
                        return next(err);
                    }
                    if (!product) {
                        return next({
                            msg: 'Product not found'
                        });
                    }
                    let updatedMapProduct = map_product_req(product, req.body);
                    updatedMapProduct.reviews.push({
                        user: req.loggedInUser._id,
                        message: req.body.ratingMsg,
                        point: req.body.ratingPoint
                    });
                    updatedMapProduct.save(function(err, updated) {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).json(updated);
                    })
                })
        })
        .delete(function(req, res, next) {
            ProductModel.findById(req.params.id)
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
                            msg: "Product not found"
                        });
                    }
                });
        });




    function search(query) {
        return new Promise(function(resolve, reject) {
            ProductModel.find(query)
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