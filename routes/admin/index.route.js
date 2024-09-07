const systemConfig = require("../../config/system");
const dashboardRoute=require("./dashboard.route")
const productRoute=require("./product.route")
const productCategoryRoute=require("./product-category.route");
const roleRoute=require("../../routes/admin/role.route");
module.exports=(app)=>{
    app.use(systemConfig.prefixAdmin+"/dashboard",dashboardRoute);
    app.use(systemConfig.prefixAdmin+"/products",productRoute);
    app.use(systemConfig.prefixAdmin+"/products-category",productCategoryRoute);
    app.use(systemConfig.prefixAdmin+"/roles",roleRoute);
}