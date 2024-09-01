const express=require("express")
const route=express.Router()

const controllers=require("../../controllers/admin/dashboard.controller");


route.get("/",controllers.dashboard);

module.exports=route;