const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");
//[GET] /

module.exports.index = async (req, res) => {
    // Lấy ra sản phẩm nổi bật
    const productFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(6);
    const newProductFeatured = productHelper.priceNewProducts(productFeatured);
    const newproduct = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ position: "desc" }).limit(6);
    const newProductNew=productHelper.priceNewProducts(newproduct);

      
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productFeatured: newProductFeatured,
        productNew: newProductNew,
    });

    // Hiển thij danh sách sp mới nhất


}

module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
        //Tìm 1 bản ghi dùng findOne
        const productFeatured = await Product.findOne(find);

        res.render(`client/pages/home/detail`, {
            pageTitle: productFeatured.title,
            productFeatured: productFeatured
        });
    } catch (error) {
        req.flash("error", "Không tồn tại sản phẩm")
        res.redirect(`/`);
    }

}
