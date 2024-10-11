const mongoose=require("mongoose");
const general=require("../helpers/generate");
const userSchema=new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        tokenUser: {
            type: String,
            default: general.generateRandomString(20)
        },
        phone: String,
        avatar: String,
        status: {
            type: String,
            default:"active"
        },
        requestFriends:Array,  //Lời mời đã gửi
        acceptFriends: Array, //Lời mời đã chấp nhận
        friendList: [
            {
                user_id: String,
                room_chat_id: String,
            }
        ],
        statusOnline: String,
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



const User=mongoose.model("User",userSchema,"users");
module.exports=User;