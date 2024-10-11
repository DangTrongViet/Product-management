const uploadToCloudinary=require("../../helpers/uploadToCloudinary");


module.exports.upload =async (req, res, next) => {
    if (req.file) {
        const link=await uploadToCloudinary(req.file.buffer);
         // req.file.fieldname là lấy ra val của key name
         req.body[req.file.fieldname] = link;

    }
    else {
        next();
    }
}