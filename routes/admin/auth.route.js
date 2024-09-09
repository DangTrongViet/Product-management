const loginValidate=require("../../validates/admin/auth.validate")
const express=require("express")
const route=express.Router()

const controllers=require("../../controllers/admin/auth.controller");


route.get("/login",controllers.login);

route.post("/login",loginValidate.loginPost,controllers.loginPost);
route.get("/logout",controllers.logout);

module.exports=route;