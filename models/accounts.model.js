const mongoose=require("mongoose");
const general=require("../helpers/generate");
const accountSchema=new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        token: {
            type: String,
            default: general.generateRandomString(20)
        },
        phone: String,
        avatar: String,
        role_id: String,
        status: String,
        deleted:{
            type: Boolean,
            default: false
        },
        deletedAt: Date,
        resetAt: Date
    },
    //để update các time tạo sp và sửa 
    {
        timestamps:true
        
    });



const Account=mongoose.model("Account",accountSchema,"accounts");
module.exports=Account;