

//[GET] /products

const productCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model")
const productHelper = require("../../helpers/product");
const productCategoryHelper=require("../../helpers/product-category.helper");
const ProductCategory = require("../../models/product-category.model");

module.exports.index = async (req, res) => {
    // Lọc dữ liệu
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" });

    const newProduct = productHelper.priceNewProducts(products);

    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: newProduct
    });
}

module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slugProduct,
            status: "active"
        }
        //Tìm 1 bản ghi dùng findOne
        const product = await Product.findOne(find);
        if(product.product_category_id){
            const category=await ProductCategory.findOne({
                _id:product.product_category_id,
                status: "active",
                deleted:false
            });
            product.category=category;
        }

        product.priceNew=productHelper.priceNewProduct(product);


        res.render(`client/pages/products/detail`, {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        req.flash("error", "Không tồn tại sản phẩm")
        res.redirect(`/products`);
    }

}


module.exports.category = async (req, res) => {
    const category = await productCategory.findOne({
        slug: req.params.slugCategory,
        deleted: false
    });

   
    const listSubCategory=await productCategoryHelper.getSubCategory(category.id);
    
    const listSubCategoryId=listSubCategory.map(item=>item.id);
    
    const products = await Product.find({
        product_category_id: { $in: [category.id,...listSubCategoryId] },
        deleted: false
    }).sort({ position: "desc" })


    const newProduct = productHelper.priceNewProducts(products);

    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newProduct
    });

}