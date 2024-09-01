const Product=require("../../models/product.model");
const filterStatusHelper=require("../../helpers/filterStatus.helper");
const searchHelper=require("../../helpers/search.helper");
const paginationHelper = require("../../helpers/pagination");
module.exports.recycleBin=async (req,res)=>{
    const find={
        deleted:true
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
    .skip(objPagination.skip);;
    res.render("admin/pages/products/recycleBin",{
        pageTitle:" Trang thư mục rác",
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

//[PATCH] /admin/products/recycleBin/change-multi
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
        case "reset-all":
            await Product.updateMany({_id:{ $in: ids}},
                {deleted: false, 
                    resetAt: new Date()});
            req.flash("success",`Đã khôi phục thành công ${ids.length} sản phẩm!`);
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

//[Reset] /admin/products/recycleBin/reset
module.exports.resetItem=async (req,res)=>{
    const id=req.params.id;
    await Product.updateOne({_id:id}, {deleted: false,
        // Cập nhật trường item ngày reset item.
        resetAt:new Date()}
    );
    res.redirect("back");
} 
//End

//[DELETE] /admin/products/recycleBin/delete/:id

module.exports.deleteItem=async (req,res)=>{
    const id=req.params.id;
    //Xóa cứng
    // await Product.deleteOne({_id:id});

    //Xóa mềm.
    await Product.deleteOne({_id:id});
    req.flash("success",`Xóa sản phẩm thành công!`);
    res.redirect("back");
}