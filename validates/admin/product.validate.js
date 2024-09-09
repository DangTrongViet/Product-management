//thêm tham số next để đi đến kế tiếp.
module.exports.createPost=(req,res,next)=>{
    if(!req.body.title){
        req.flash("error","Vui lòng nhập tiêu đề!");
        res.redirect("back");
        return;
    }
    //đi sang bưỡc kế tiếp 
    next();
}