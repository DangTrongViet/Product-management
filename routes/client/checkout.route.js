const express = require('express');
const route=express.Router();
const controller=require("../../controllers/client/checkout.controller");

route.get("/", controller.index);
route.get("/success/:orderId", controller.success);
route.post("/order", controller.order);
module.exports=route;