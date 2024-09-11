const productRoutes=require("./product.route")
const homeRoutes=require("./home.route")
const categoryMiddleware=require("../../middlewares/client/category.middleware");
// để nhúng truyền app vào để lấy routes
module.exports=(app)=>{
    // Route nào cũng dùng nên khai báo như dòng dưới
    app.use(categoryMiddleware.category)
    
    
    app.use("/",homeRoutes);
    app.use("/products",productRoutes);
    
    
}