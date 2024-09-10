const mongoose=require("mongoose");
const slug=require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema=new mongoose.Schema(
    {
        title: String,
        product_category_id: {
            type:String,
            default:""
        },
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        deleted: {
            type: Boolean,
            default: false,
        },
        slug:{
            type: String,
            slug: "title",
            unique:true
        },
        createdBy:{
            account_id: String,
            createdAt:{
                type: String,
                default: Date.now
            }
        },
        deletedBy:{
            account_id:String,
            deletedAt: Date 
        },
        resetAt: Date
    },
    //để update các time tạo sp và sửa 
    {timestamps:true
        
    });



const Product=mongoose.model("Product",productSchema,"products");
module.exports=Product;