const express=require("express")
const route=express.Router()

const controllers=require("../../controllers/admin/role.controller");

route.get("/",controllers.index);

route.get("/create",controllers.create);
route.post("/create",controllers.createPost);
route.get("/edit/:id",controllers.edit);
route.patch("/edit/:id",controllers.editPost);

route.get("/permissions",controllers.permissions);

route.patch("/permissions",controllers.permissionsPatch);

module.exports=route;