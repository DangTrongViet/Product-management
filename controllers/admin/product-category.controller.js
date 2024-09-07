const ProductCategory=require("../../models/product-category.model")
const systemConfig=require("../../config/system");
const filterStatusHelper=require("../../helpers/filterStatus.helper");
const searchHelper=require("../../helpers/search.helper");
const paginationHelper=require("../../helpers/pagination");
const createTree=require("../../helpers/create.Tree");
const MiddlewareCloud=require("../../middlewares/admin/uploadCloudinary.middleware");
//[GET] /admin/products-category
module.exports.index=async (req,res)=>{
    const filterStatus=filterStatusHelper(req.query);
    const objSearch=searchHelper(req.query);
    let find={
        deleted: false
    }
  
    if(req.query.status){
        find.status=req.query.status;
    }
    if(objSearch.regax){
        find.title=objSearch.regax;
    }
    const countProduct=await ProductCategory.countDocuments(find);


    let objPagination=paginationHelper(
        {
            currentPage:1,
            limitItems:4
        },
        req.query,
        countProduct

    )
    let sort={};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey]=req.query.sortValue;    
    }else{
        sort.position="desc";
    }
    const records=await ProductCategory.find(find).sort(sort).limit(objPagination.limitItems)
    .skip(objPagination.skip);;
    const newRecords=createTree.tree(records);
;
    res.render("admin/pages/products-category/index",{
        pageTitle:" Danh mục sản phẩm",
        records: newRecords,
        filterStatus:filterStatus,
        keyword:objSearch.keyword,  
        pagination:objPagination   
    });
    
};
module.exports.create= async(req,res)=>{
    let find={
        deleted: false
    }
    const records=await ProductCategory.find(find);
    const newRecords=createTree.tree(records);

    res.render("admin/pages/products-category/create",{
        pageTitle: "Tạo danh mục sản phẩm",
        records:newRecords
        
    });
}

module.exports.createPost=async (req,res)=>{
    if(req.body.position==""){
        const countProducts=await ProductCategory.countDocuments();
        req.body.position=countProducts+1;
    }
    else{
        req.body.position=parseInt(req.body.position); 
    }
    const record=new ProductCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}


module.exports.changeStatus= async (req,res)=>{
    const status=req.params.status;
    const id=req.params.id;
    await ProductCategory.updateOne({_id:id},{status:status})
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
            await ProductCategory.updateMany({_id:{ $in: ids}},{status: "active"});
            req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
           break;
        case "inactive":
            await ProductCategory.updateMany({_id:{ $in: ids}},{status: "inactive"});
            req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);

            break;

        case "delete-all":
            await ProductCategory.updateMany({_id:{ $in: ids}},
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
                await ProductCategory.updateOne({_id:id}, {
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

//[DELETE] /admin/products-category/delete/:id

module.exports.deleteItem=async (req,res)=>{
    const id=req.params.id;
    //Xóa cứng
    // await ProductCategory.deleteOne({_id:id});

    //Xóa mềm.
    await ProductCategory.updateOne({_id:id}, {deleted: true,
        // Cập nhật trường item ngày xóa item.
        deletedAt:new Date()}
    );
    res.redirect("back");
}



//[GET] /admin/products-category/edit/:id
module.exports.edit=async(req,res)=>{
    try{
        const find={
            deleted: false,
            _id:req.params.id
        }
        let Find={
            deleted: false
        }
        //Tìm 1 bản ghi dùng findOne
        const product=await ProductCategory.find(find);
        const record=await ProductCategory.find(Find);
        const newRecord=createTree.tree(record); 
        
        res.render("admin/pages/products-category/edit",{
            pageTitle: "Sửa sản phẩm",
            product:product,
            record:newRecord
        });
    }catch(error){
        req.flash("error","Không tồn tại sản phẩm")
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
}


module.exports.editPatch=async(req,res)=>{
    req.body.position=parseInt(req.body.position);
    console.log(req.body);
     
    if(req.file){
       MiddlewareCloud.upload;
    }
    //luưu vô db
    //nếu gửi bằng form thì dùng req.body để lấy dữ liệu trong form
    
    try{
        await ProductCategory.updateOne({
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
        const product=await ProductCategory.findOne(find);
        res.render("admin/pages/products-category/detail",{
            pageTitle: ProductCategory.title,
            product:product
        });
    }catch(error){
        req.flash("error","Không tồn tại sản phẩm")
        res.redirect(`${systemConfig.prefixAdmin}/products-category/detail`)
    }
}
