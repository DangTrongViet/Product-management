const express=require("express")
const route=express.Router()
const multer=require("multer");

const storageMulter=require("../../helpers/storageMulter");
const upload=multer({storage:storageMulter()})
const controllers=require("../../controllers/admin/product.controller")
const controllers_recycleBin=require("../../controllers/admin/recycleBin.controller")
const validate=require("../../validates/admin/product.validate");
route.get("/",controllers.index);
//:name laf route động
route.patch("/change-multi",controllers.changeMulti);

route.patch("/change-status/:status/:id",controllers.changeStatus);

route.delete("/delete/:id",controllers.deleteItem);

route.delete("/recycleBin/delete/:id",controllers_recycleBin.deleteItem);
route.post("/recycleBin/reset/:id",controllers_recycleBin.resetItem);
route.patch("/recycleBin/change-status/:status/:id",controllers_recycleBin.changeStatus);
route.patch("/recycleBin/change-multi",controllers_recycleBin.changeMulti);
route.get("/recycleBin",controllers_recycleBin.recycleBin);

route.get("/create",controllers.create);
route.post("/create",upload.single("thumbnail"),
validate.cretePost,controllers.createPost);



route.get("/edit/:id",controllers.edit);

route.patch("/edit/:id",upload.single("thumbnail"),
validate.cretePost,controllers.editPatch);

route.get("/detail/:id",controllers.detail);


module.exports=route;