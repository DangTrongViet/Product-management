const SettingGeneral = require("../../models/settings-general.model");
const systemConfig = require("../../config/system");
// [Get] /setting/general
module.exports.general = async (req, res) => {
    // truyền {} lấy ra bản ghi đầu tiên
    const settingGeneral = await SettingGeneral.findOne({})
    res.render("admin/pages/settings/general", {
        pageTitle: "Cài đặt chung",
        settingGeneral: settingGeneral
    })

}


// [PATCH] /setting/general
module.exports.generalPatch = async (req, res) => {
    const settingGeneral = await SettingGeneral.findOne({});
    if (settingGeneral) {
        await SettingGeneral.updateOne({
            _id: settingGeneral.id,
        }, req.body);

    } else {

        const record = new SettingGeneral(req.body);
        await record.save();
        res.redirect("back");
    }
}