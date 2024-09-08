const mongoose=require("mongoose");
const roleSchema=new mongoose.Schema(
    {
        title: String,
        description: String,
        permission:{
            type: Array,
            default:[]
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date
    },
    //để update các time tạo sp và sửa 
    {timestamps:true
        
    });



const Role=mongoose.model("Role",roleSchema,"roles");
module.exports=Role;