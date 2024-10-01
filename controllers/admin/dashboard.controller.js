const ProductCategory=require("../../models/product-category.model");
const Product=require("../../models/product.model")

module.exports.dashboard=async (req,res) => {
    const statistic={
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0,
        }
    };

    statistic.categoryProduct.total= await ProductCategory.countDocuments({
        deleted: false,
    });

    statistic.categoryProduct.active= await ProductCategory.countDocuments({
        deleted: false,
        status: "active"
    });
    statistic.categoryProduct.inactive= await ProductCategory.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // TH veef product, user, admin lam tuong tu

    res.render("admin/pages/dashboard/index",{
        pageTitle: "Trang tổng quan",
        statistic:statistic

    });

}