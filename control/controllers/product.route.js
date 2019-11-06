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
        product.tags = productDetails.tags.split(',');
    if (productDetails.warrentyStatus)
        product.warrenty = {
            warrentyStatus: productDetails.warrentyStatus,
            warrentyPeriod: productDetails.warrentyPeriod
        }
    if (productDetails.discountedItem) {
        product.discount = {
            discountedItem: productDetails.discountedItem,
            discountType: productDetails.discountType,
            discount: productDetails.discount
        }
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

module.exports = function (a, b, c) {


    router.route('/')
        .get(function (req, res, next) {
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
                .exec(function (err, products) {
                    if (err) {
                        return next(err);
                    }
                    console.log('data >>>', products.length);
                    res.status(200).json(products);
                })
        })
        .post(function (req, res, next) {
            var newProduct = new ProductModel({});
            var newMappedProduct = map_product_req(newProduct, req.body);
            newMappedProduct.user = req.loggedInUser._id;
            newMappedProduct.save(function (err, saved) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(saved);
            });
        });

    router.route('/:id')
        .get(function (req, res, next) {

        })
        .put(function (req, res, next) {

        })
        .delete(function (req, res, next) {

        });

    return router;

}
