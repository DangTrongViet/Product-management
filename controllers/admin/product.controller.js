const Product=require("../../models/product.model");
const filterStatusHelper=require("../../helpers/filterStatus.helper");
const searchHelper=require("../../helpers/search.helper");
const paginationHelper = require("../../helpers/pagination");



const systemConfig=require("../../config/system");

//[GET] /admin/products
module.exports.index=async (req,res)=>{
    const find={
        deleted:false
    }
    const filterStatus=filterStatusHelper(req.query);
    const objSearch=searchHelper(req.query);

    if(req.query.status){
        find.status=req.query.status;
    }
    if(objSearch.regax){
        find.title=objSearch.regax;
    }
    const countProduct=await Product.countDocuments(find);


    //Pagination
    let objPagination=paginationHelper(
        {
            currentPage:1,
            limitItems:4
        },
        req.query,
        countProduct

    )

    
    const products=await Product.find(find)
    .sort({position:"desc"})
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);


    res.render("admin/pages/products/index",{
        pageTitle:" Trang sản phẩm",
        products:products,
        filterStatus:filterStatus,
        keyword:objSearch.keyword,
        pagination:objPagination
        
    });





}


//[PATCH] /admin/products/change-status./status/id
module.exports.changeStatus= async (req,res)=>{
    console.log(req.params)
    const status=req.params.status;
    const id=req.params.id;
    await Product.updateOne({_id:id},{status:status})
    req.flash("success", "Cập nhật trạng thái thành công!");
    // "back " để ở lại trang, dùng redirect là trang sẽ tự load lại khi update.
    res.redirect("back");
};

//[PATCH] /admin/products/change-multi
module.exports.changeMulti=async (req,res)=>{
    const type=req.body.type;
    const ids=req.body.ids.split(", ");
    switch (type){
        case "active":
            await Product.updateMany({_id:{ $in: ids}},{status: "active"});
            req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
           break;
        case "inactive":
            await Product.updateMany({_id:{ $in: ids}},{status: "inactive"});
            req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);

            break;

        case "delete-all":
            await Product.updateMany({_id:{ $in: ids}},
                {deleted: true, 
                    deletedAt: new Date()});
            req.flash("success",`Đã xóa thành công ${ids.length} sản phẩm!`);
            break;
        case "change-position":
            // await Product.updateMany({_id:{ $in: ids}},{});
            for(const item of ids){
                //id = item khi split() tại vị trí 0 còn position tại vị trí 1.
                let [id,position]=item.split("-");
                position=parseInt(position);
                await Product.updateOne({_id:id}, {
                    position: position
                })

            }
            req.flash("success",`Cập nhật vị trí thành công  ${ids.length} sản phẩm!`);
            break;
        default:
            break;
    }
    res.redirect("back");
}

//[DELETE] /admin/products/delete/:id

module.exports.deleteItem=async (req,res)=>{
    const id=req.params.id;
    //Xóa cứng
    // await Product.deleteOne({_id:id});

    //Xóa mềm.
    await Product.updateOne({_id:id}, {deleted: true,
        // Cập nhật trường item ngày xóa item.
        deletedAt:new Date()}
    );
    res.redirect("back");
}


//Create Product
module.exports.create=(req,res)=>{
    res.render("admin/pages/products/create",{
        pageTitle: "Thêm mới sản phẩm"
    });
}

module.exports.createPost=async (req,res)=>{
    
    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt(req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);

    if(req.body.position==""){
        const countProducts=await Product.countDocuments();
        req.body.position=countProducts+1;
    }
    else{
        req.body.position=parseInt(req.body.position);
        
    }
    //luưu vô db
    //nếu gửi bằng form thì dùng req.body để lấy dữ liệu trong form.
    const product=new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}


//[GET] /admin/products/edit/:id
module.exports.edit=async(req,res)=>{
    try{
        const find={
            deleted: false,
            _id:req.params.id
        }
        //Tìm 1 bản ghi dùng findOne
        const product=await Product.findOne(find);
        
        
        res.render("admin/pages/products/edit",{
            pageTitle: "Sửa sản phẩm",
            product:product
        });
    }catch(error){
        req.flash("error","Không tồn tại sản phẩm")
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}


module.exports.editPatch=async(req,res)=>{
    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt(req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);
    req.body.position=parseInt(req.body.position);
     
    if(req.file){
        req.body.thumbnail=`/admin/uploads/${req.file.filename}`;
    }
    //luưu vô db
    //nếu gửi bằng form thì dùng req.body để lấy dữ liệu trong form.
    try{
        await Product.updateOne({
            _id: req.params.id},
        req.body);
        req.flash("success","Cập nhật sản phẩm thành công")


    }catch(error){
        req.flash("error", "Cập nhật sản phẩm thất bại")
    }

    res.redirect("back")
}

module.exports.detail=async (req,res)=>{
    try{
        const find={
            deleted: false,
            _id:req.params.id
        }
        //Tìm 1 bản ghi dùng findOne
        const product=await Product.findOne(find);
        
        res.render("admin/pages/products/detail",{
            pageTitle: product.title,
            product:product
        });
    }catch(error){
        req.flash("error","Không tồn tại sản phẩm")
        res.redirect(`${systemConfig.prefixAdmin}/products/detail`);
    }
}

