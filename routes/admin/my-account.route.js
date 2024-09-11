const express=require("express")
const route=express.Router()
const multer = require("multer");
const upload = multer();
const validate = require("../../validates/admin/accounts.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloudinary.middleware");


const controllers=require("../../controllers/admin/my-account.controller");

route.get("/",controllers.index);

route.get("/edit",controllers.edit);

route.patch("/edit",upload.single("avatar"),
uploadCloud.upload,
validate.editPatch,controllers.editPatch);

module.exports=route;