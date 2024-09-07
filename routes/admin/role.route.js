const express=require("express")
const route=express.Router()

const controllers=require("../../controllers/admin/role.controller");

route.get("/",controllers.index);

route.get("/create",controllers.create);
route.post("/create",controllers.createPost);
route.get("/edit/:id",controllers.edit);
route.patch("/edit/:id",controllers.editPost);

module.exports=route;