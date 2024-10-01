const mongoose=require("mongoose");
const general=require("../helpers/generate");
const settingGeneralSchema=new mongoose.Schema(
    {
        websiteName: String,
        logo: String,
        phone: String,
        email: String,
        address: String,
        copyright: String
       
    },
    //để update các time tạo sp và sửa 
    {
        timestamps:true
        
    });



const SettingGeneral=mongoose.model("SettingGeneral",settingGeneralSchema,"settings-general");
module.exports=SettingGeneral;