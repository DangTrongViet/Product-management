const productRoutes=require("./product.route")
const homeRoutes=require("./home.route")
const categoryMiddleware=require("../../middlewares/client/category.middleware");
const searchRoute=require("./search.route");
const cartRoute=require("./cart.route");
const checkoutRoute=require("./checkout.route");
const cartMiddleware=require("../../middlewares/client/cart.middleware");
// để nhúng truyền app vào để lấy routes
module.exports=(app)=>{
    // Route nào cũng dùng nên khai báo như dòng dưới
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.cartId);
    
    app.use("/cart",cartRoute);
    app.use("/",homeRoutes);
    app.use("/products",productRoutes);

    app.use("/search",searchRoute);
    app.use("/checkout",checkoutRoute)
    
    
}