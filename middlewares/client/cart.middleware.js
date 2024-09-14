const Cart=require("../../models/carts.model");
module.exports.cartId=async(req,res,next)=>{
    if(!req.cookies.cartId){
        const cart=new Cart();
        await cart.save();
        const expiresCookie= 365 * 24 * 60 * 60 * 1000;
        // Luư key cardId vô cookie. id giỏ hànng
        res.cookie("cartId",cart._id,{
            // Thời hạn để key trên cookie
            expires: new Date(Date.now()+expiresCookie)
        });
    }else{
        const cart=await Cart.findOne({
            _id: req.cookies.cartId
        })
        cart.totalQuantity=cart.products.reduce((sum,item)=>sum+
            item.quantity,0);

        res.locals.miniCart=cart;
    }
    next();
}