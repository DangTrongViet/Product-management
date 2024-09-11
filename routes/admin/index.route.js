const systemConfig = require("../../config/system");
const dashboardRoute=require("./dashboard.route")
const productRoute=require("./product.route")
const productCategoryRoute=require("./product-category.route");
const roleRoute=require("../../routes/admin/role.route");
const accountRoute=require("../../routes/admin/accounts.route")
const authRoute=require("../../routes/admin/auth.route");
const myAccountRoute=require("../../routes/admin/my-account.route");
const authMiddleware=require("../../middlewares/admin/auth.middleware");
module.exports=(app)=>{
    app.use(systemConfig.prefixAdmin+"/dashboard",authMiddleware.requireAuth,dashboardRoute);
    app.use(systemConfig.prefixAdmin+"/products",authMiddleware.requireAuth,productRoute);
    app.use(systemConfig.prefixAdmin+"/products-category",authMiddleware.requireAuth,productCategoryRoute);
    app.use(systemConfig.prefixAdmin+"/roles",authMiddleware.requireAuth,roleRoute);
    app.use(systemConfig.prefixAdmin+"/accounts",authMiddleware.requireAuth,accountRoute);
    app.use(systemConfig.prefixAdmin+"/my-account",authMiddleware.requireAuth,myAccountRoute);
    app.use(systemConfig.prefixAdmin+"/auth",authRoute);

}