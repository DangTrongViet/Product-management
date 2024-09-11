const Account=require("../../models/accounts.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
module.exports.index=(req,res)=>{
    res.render("admin/pages/my-account/index",{
        pageTitle: "Thông tin cá nhân"

    })

}


module.exports.edit=(req,res)=>{
    res.render("admin/pages/my-account/edit",{
        pageTitle: "Chỉnh sửa thông tin cá nhân"

    })

}



module.exports.editPatch=async(req,res)=>{
    const id = res.locals.user.id;
    const emailExist = await Account.findOne({
        // $ne (not equal) để k tìm chính bản ghi của hiện tại
        _id:{$ne:id},
        email: req.body.email,
        deleted: false
    });
    if (emailExist) {

        req.flash("error", "Email này đã tồn tại!");
        res.redirect(`${systemConfig.prefixAdmin}/my-account`);
    }
    else {

        if (req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            delete req.body.password;

        }
        await Account.updateOne({ _id: id }, req.body);
        req.flash("success", "Cập nhật tài khỏan thành công!");
    }

    res.redirect("back");

}