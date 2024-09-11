const ProductCategory=require("../../models/product-category.model");
const createTree=require("../../helpers/create.Tree");

module.exports.category=async(req,res,next)=>{
    let find={
        deleted: false
    }
    const record=await ProductCategory.find(find);
    const newProductCategory=createTree.tree(record);
    res.locals.layoutProductCategory=newProductCategory;
    next();
}