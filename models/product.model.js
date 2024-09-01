const mongoose=require("mongoose");
const slug=require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema=new mongoose.Schema(
    {
        title: String,
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
            unique:true
        },
        slug:{
            type: String,
            slug: "title",
        },
        deletedAt: Date,
        resetAt: Date
    },
    //để update các time tạo sp và sửa 
    {timestamps:true
        
    });



const Product=mongoose.model("Product",productSchema,"products");
module.exports=Product;