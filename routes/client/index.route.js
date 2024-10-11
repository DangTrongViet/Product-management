const productRoutes=require("./product.route")
const homeRoutes=require("./home.route")
const categoryMiddleware=require("../../middlewares/client/category.middleware");
const searchRoute=require("./search.route");
const cartRoute=require("./cart.route");
const checkoutRoute=require("./checkout.route");
const chatRoute=require("./chat.route");
const userRoute=require("../../routes/client/user.route");
const cartMiddleware=require("../../middlewares/client/cart.middleware");
const usersRoute=require("./users.route");
// để nhúng truyền app vào để lấy routes

const authMiddleware=require("../../middlewares/client/auth.middleware");
const userMiddleware=require("../../middlewares/client/user.middleware");
const settingMiddleware=require("../../middlewares/client/setting.middleware");
module.exports=(app)=>{
    // Route nào cũng dùng nên khai báo như dòng dưới
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.settingGeneral);

    app.use("/user",userRoute);
    app.use("/chat",authMiddleware.requireAuth,chatRoute);
    
    app.use("/cart",cartRoute);
    app.use("/",homeRoutes);
    app.use("/products",productRoutes);
    app.use("/users",usersRoute);

    app.use("/search",searchRoute);
    app.use("/checkout",checkoutRoute)
    
    
}