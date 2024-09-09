const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
const Role = require("../../models/role.model");

module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    };
    const records = await Account.find(find).select("-password -token");

    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });
        record.role = role;
    }
    res.render("admin/pages/accounts/index", {
        pageTitle: "Trang danh sách tài khoản",
        records: records,


    })

}


module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    };
    const records = await Role.find(find);

    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo tài khoản",
        records: records
    })

}

module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    })
    if (emailExist) {
        req.flash("error", "Email này đã tồn tại!");
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
    else {
        req.body.password = md5(req.body.password);
        const accounts = new Account(req.body);
        await accounts.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}



module.exports.edit = async (req, res) => {
    try {
        const find = {
            _id: req.params.id,
            deleted: false
        }
        const data = await Account.findOne(find);
        const role = await Role.find({
            deleted: false
        })
        console.log(data)


        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản",
            data: data,
            roles: role
        });
    } catch (error) {
        req.flash("error", "Không tồn tại tài khoản")
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}


module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const emailExist = await Account.findOne({
        // $ne (not equal) để k tìm chính bản ghi của hiện tại
        _id:{$ne:id},
        email: req.body.email,
        deleted: false
    });
    if (emailExist) {

        req.flash("error", "Email này đã tồn tại!");
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
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
