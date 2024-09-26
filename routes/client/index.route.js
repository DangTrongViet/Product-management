const productRoutes=require("./product.route")
const homeRoutes=require("./home.route")
const categoryMiddleware=require("../../middlewares/client/category.middleware");
const searchRoute=require("./search.route");
const cartRoute=require("./cart.route");
const checkoutRoute=require("./checkout.route");

const userRoute=require("../../routes/client/user.route");
const cartMiddleware=require("../../middlewares/client/cart.middleware");
// để nhúng truyền app vào để lấy routes

const userMiddleware=require("../../middlewares/client/user.middleware");
module.exports=(app)=>{
    // Route nào cũng dùng nên khai báo như dòng dưới
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);
    app.use("/user",userRoute);
    
    app.use("/cart",cartRoute);
    app.use("/",homeRoutes);
    app.use("/products",productRoutes);

    app.use("/search",searchRoute);
    app.use("/checkout",checkoutRoute)
    
    
}