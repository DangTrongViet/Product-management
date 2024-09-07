const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
// [Get] /admin/role
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    const records = await Role.find(find);

    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records
    })

}

module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    };
    const records = await Role.find(find);

    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo nhóm quyền",
        records: records
    })

}



module.exports.createPost = async (req, res) => {

    const records = new Role(req.body)

    await records.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);


}

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const find = {
            deleted: false,
            _id: id
        };
        const records = await Role.findOne(find);
        res.render("admin/pages/roles/edit", {
            pageTitle: "Sửa nhóm quyền",
            records: records
        })
    } catch {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }

}

module.exports.editPost = async (req, res) => {
    try{
        await Role.updateOne({
            _id: req.params.id},
        req.body);
        req.flash("success","Cập nhật nhóm quyền thành công")

    }catch(error){
        req.flash("error", "Cập nhật nhóm quyền thất bại")
    }

    res.redirect("back")

}