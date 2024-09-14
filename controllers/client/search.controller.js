
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");


module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;
    let products = [];
    if (keyword) {
        const regax = new RegExp(keyword, "i");
        const products = await Product.find({
            deleted: false,
            title: regax,
            status: "active"
        });
        const newproduct=productHelper.priceNewProducts(products);

        res.render("client/pages/search/index", {
            pageTitle: "Kết quả tìm kiếm",
            product: newproduct,
        });
    }
}