module.exports.priceNewProducts = (productFeatured) => {
    const newProductFeatured = productFeatured.map(item => {
        item.priceNew = (item.price - item.price *
            (item.discountPercentage / 100))
            .toFixed(0);
        return item;
    });

    return newProductFeatured
}


module.exports.priceNewProduct = (product) => {
    const priceNew = (
        product.price - product.price *
        (product.discountPercentage / 100))
        .toFixed(0);

    return parseInt(priceNew);
}


