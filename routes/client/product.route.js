
const express = require('express');
const route=express.Router();
const controller=require("../../controllers/client/products.controller");
route.get('/',controller.index);

// // / thể hiện là trang hiện tại
// route.get("/:slug",controller.detail);

route.get("/:slugCategory",controller.category);

route.get("/detail/:slugProduct",controller.detail);

module.exports=route;
