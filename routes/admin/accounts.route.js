const express=require("express")
const route=express.Router()
const multer = require("multer");
const upload = multer();
const controllers=require("../../controllers/admin/accounts.controller");
const validate = require("../../validates/admin/accounts.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloudinary.middleware");


route.get("/",controllers.index);

route.get("/create",controllers.create);

//[POST] admin/accounts
route.post("/create",upload.single("avatar"), uploadCloud.upload,
validate.createPost,controllers.createPost);

route.get("/edit/:id",controllers.edit);

route.patch("/edit/:id",upload.single("avatar"),
validate.editPatch,controllers.editPatch,);

module.exports=route;