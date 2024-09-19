const Cart = require("../../models/carts.model");

const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product")
// [POST] /cart/add/:products
module.exports.addPost = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;
    // console.log(productId);
    // console.log(quantity);
    // console.log(cartId);

    const cart = await Cart.findOne({
        _id: cartId
    })

    // find trong js
    // Thêm sản phẩm vào giỏ hàng và cập nhật lại số lượng nếu có sp đó trong giỏ hàng
    const existProductInCart = cart.products.find(item => item.product_id == productId);
    console.log(existProductInCart);

    if (existProductInCart) {
        const newQuantity = quantity + existProductInCart.quantity;
        await Cart.updateOne({
            _id: cartId,
            "products.product_id": productId
        }, {
            $set: {
                "products.$.quantity": newQuantity
            }
        })

    } else {
        const objCart = {
            product_id: productId,
            quantity: quantity
        };
        await Cart.updateOne(
            {
                _id: cartId
            },
            {
                $push: { products: objCart }
            }
        )

    }



    req.flash("success", "Đã thêm sản phẩm vào giỏ hàng!")
    res.redirect("back");
}

// [GET] /cart/
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    });
    if (cart.products.length > 0) {

        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({
                _id: productId
            }).select("title thumbnail slug price discountPercentage");
            productInfo.priceNew = productHelper.priceNewProduct(productInfo);

            item.productInfo = productInfo
            item.totalPrice = productInfo.priceNew * item.quantity
        }

    }
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)

    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    });

}


module.exports.delete = async (req, res) => {

    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    await Cart.updateOne({
        _id: cartId
    }, {
        $pull: {
            products: { product_id: productId }
        }
    })
    req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng");
    res.redirect("back");
}




module.exports.update = async (req, res) => {

    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = req.params.quantity;
    console.log(quantity)
    await Cart.updateOne(
        {
            _id: cartId,
            "products.product_id": productId,
        },
        {
            $set: {
                "products.$.quantity": quantity,
            }
        })
    req.flash("success", "Đã cập nhật sản phẩm trong giỏ hàng");
    res.redirect("back");
}