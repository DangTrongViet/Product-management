//thêm tham số next để đi đến kế tiếp.
module.exports.editPatch=(req,res,next)=>{
    if(!req.body.fullName){
        req.flash("error","Vui lòng nhập Họ tên!");
        res.redirect("back");
        return;
    }
    if(!req.body.email){
        req.flash("error","Vui lòng nhập Email!");
        res.redirect("back");
        return;
    }
    //đi sang bưỡc kế tiếp 
    next();
}
module.exports.createPost=(req,res,next)=>{
    if(!req.body.password){
        req.flash("error","Vui lòng nhập Mật khẩu!");
        res.redirect("back");
        return;
    }
    //đi sang bưỡc kế tiếp 
    next();
}