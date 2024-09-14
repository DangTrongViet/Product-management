const Cart = require("../../models/carts.model");


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
        const newQuantity=quantity + existProductInCart.quantity;
        await Cart.updateOne({
            _id: cartId,
            "products.product_id": productId
        },{
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

module.exports.index = async (res, req) => {
    res.send("ok")
}