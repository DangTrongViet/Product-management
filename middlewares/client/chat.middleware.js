const RoomChat = require("../../models/rooms-chats.model");

module.exports.isAccess = async (req,res,next) => {
    const userId=res.locals.user.id;
    const roomChatId=req.params.roomChatId

    const existUserInRoomChat= await RoomChat.findOne({
        _id: roomChatId,
        "users.user_id": userId,
        deleted: false
    });

    if(existUserInRoomChat){
        next();
    }else{
        res.redirect("/");
    }

}