const productRoutes=require("./product.route")
const homeRoutes=require("./home.route")
// để nhúng truyền app vào để lấy routes
module.exports=(app)=>{
    app.use("/",homeRoutes);
    app.use("/products",productRoutes);
    
    
}