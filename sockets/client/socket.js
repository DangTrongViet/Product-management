const Chat = require("../../models/chat.model");
const uploadToCloudinary=require("../../helpers/uploadToCloudinary");


module.exports= (res) =>{
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // SocketIO
    // dùng once Chỉ lưu 1 lần k bị tạo ra nhiều trong db
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            let images=[];

            for (const image of data.images) {
                const link=await uploadToCloudinary(image);
                images.push(link);
            }
            // Luu vao db
            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images:images
            })
            await chat.save();

            //  Trả data về client
            _io.emit("SERVER_RETURN_MESSAGE", {
                userId: userId,
                fullName: fullName,
                content: data.content,
                images:images
            })
        });
        // Typing
        socket.on("CLIENT_SEND_TYPING", async (type) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                userId: userId,
                fullName: fullName,
                type: type
            })
        });
        // End Typing

        // Delete Message
        socket.on("CLIENT_SEND_DELETE_MESSAGE",async (data) => {
            if(data.idContent){
                await Chat.deleteOne({user_id: data.idContent,content:data.content});

                socket.emit("SERVER_RETURN_DELETE_MESSAGE",data.idContent)
            }
        })
    });
    // End SocketIO
}