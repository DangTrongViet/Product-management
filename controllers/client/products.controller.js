

//[GET] /products
const Product=require("../../models/product.model")

module.exports.index=async (req, res) => {
// Lọc dữ liệu
    const products=await Product.find({
        status: "active",
        deleted: false
    }).sort({position: "desc"});
  
    const newProduct =products.map(item =>{
        item.priceNew=(item.price-item.price*(item.discountPercentage/100)).toFixed(0);
        return item;
    });

    res.render("client/pages/products/index",{
        pageTitle:"Danh sách sản phẩm",
        products: products
    });
}

module.exports.detail=async(req,res)=>{
        try{
            const find={
                deleted: false,
                slug:req.params.slug,
                status: "active"
            }
            //Tìm 1 bản ghi dùng findOne
            const product=await Product.findOne(find);
            console.log(product)
            res.render(`client/pages/products/detail`,{
                pageTitle: product.title,
                product:product
            });
        }catch(error){
            req.flash("error","Không tồn tại sản phẩm")
            res.redirect(`/products`);
        }
    
}