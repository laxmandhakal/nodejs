module.exports = function map_product_req(product, productDetails) {
    if (productDetails.name)
        product.name = productDetails.name;
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
        product.tags = Array.isArray(productDetails.tags) ? productDetails.tags : productDetails.tags.split(',');


    if (productDetails.warrentyPeriod) {
        product.warrenty.warrentyPeriod = productDetails.warrentyPeriod
        product.warrenty.warrentyStatus = true
    }
    if (productDetails.discount)
        product.discount = { discountedItem: true, discount: productDetails.discount }
    if (productDetails.returnLimit)
        product.returnLimit = productDetails.returnLimit
    if (productDetails.image)
        product.image = productDetails.image;
    if (productDetails.manuDate)
        product.manuDate = productDetails.manuDate;

    if (productDetails.quantity)
        product.quantity = productDetails.quantity;
    if (productDetails.origin)
        product.origin = productDetails.origin;
    if (productDetails.image)
        product.image = productDetails.image;
    return product;
}