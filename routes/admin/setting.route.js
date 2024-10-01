const express=require("express")
const route=express.Router()
const multer=require("multer")
const controllers=require("../../controllers/admin/setting.controller");


const upload=multer();
const uploadCloud=require("../../middlewares/admin/uploadCloudinary.middleware");
route.get("/general",controllers.general);

route.patch(
    "/general",
    upload.single("logo"),
    uploadCloud.upload,
    controllers.generalPatch
);


module.exports=route;