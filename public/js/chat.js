import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
import { FileUploadWithPreview } from "https://unpkg.com/file-upload-with-preview/dist/index.js"
const upload = new FileUploadWithPreview('upload-images',{
    multiple: true,
    maxFileCount: 6
});

// End file-upload-with-preview

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");

if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        const images=upload.cachedFileArray;

        if (content || images.length>0) {
            socket.emit("CLIENT_SEND_MESSAGE",{
                content:content,
                images:images
            });
            e.target.elements.content.value = "";
            // clear di anh da send di
            upload.resetPreviewPanel();
            // de khi gui tin nhan di hidden di typing
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    })
}

// End CLIENT_SEND_MESSAGE


// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector(".chat[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const boxTyping = document.querySelector(".chat .inner-list-typing")
    const div = document.createElement("div");
    let htmlName = "";
    let htmlContent="";
    let htmlImages="";
    
    
    if (myId == data.userId) {
        div.classList.add("inner-outgoing");
        

    } else {
        div.classList.add("inner-incoming");
        htmlName = `<div class="inner-name"> ${data.fullName}</div> `;
    }
    
    if(data.content){
        htmlContent = `
    <div class="inner-content">
        <button class="delete-icon" type="button">
            <i class="fa-solid fa-trash"></i>
        </button>
        ${data.content}
    </div>
`;

    }
    
    if(data.images.length>0){
        htmlImages=`
        <div class="inner-images">`;
        for( const image of data.images){
            htmlImages+=`<img src="${image}">`
        }

        htmlImages+="</div>"
    }

    div.innerHTML = `
        ${htmlName}
        ${htmlContent}
        ${htmlImages}`

    body.insertBefore(div, boxTyping);
    body.scrollTop = body.scrollHeight;

    // Preview Full Image
    const gallary=new Viewer(div);
});

// End SERVER_RETURN_MESSAGE

const bodyChat = document.querySelector(".chat .inner-body");

if (bodyChat) {

    bodyChat.scrollTop = bodyChat.scrollHeight;
}


// End Scroll Chat To Bottom

// Show Icon Chat
// Show Popup
const buttonIcon = document.querySelector('.button-icon');
if (buttonIcon) {
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonIcon, tooltip);

    buttonIcon.onclick = () => {
        tooltip.classList.toggle('show');
    }
};

// End Show Popup

// Show Typing
var timeOut;
const showTyping = () => {
    
    socket.emit("CLIENT_SEND_TYPING", "show");

    // Vi moi lan go typing thi se setTimeout nen dung clearTimeout th truoc do di de k bi loi.
    clearTimeout(timeOut);

    timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000);
}
// End Show Typing
// CLIENT_SEND_DELETE_MESSAGE
document.addEventListener('click', (e) => {
    // Kiểm tra xem sự kiện có xảy ra trên nút delete-icon
    const btnDelete = e.target.closest('.delete-icon');
    
    if (btnDelete) {
        // Tìm thẻ div cha chứa tin nhắn
        const parentDiv = btnDelete.closest('.inner-outgoing, .inner-incoming');
        const divContent=btnDelete.closest('.inner-content');
        if (parentDiv && divContent) {
            parentDiv.remove()
            // Gửi yêu cầu xóa tin nhắn thông qua socket
            socket.emit("CLIENT_SEND_DELETE_MESSAGE",{
                idContent:parentDiv.getAttribute("id"),
                content:divContent.textContent.trim()
            });
        }
    }
});

// END CLIENT_SEND_DELETE_MESSAGE

// SERVER_SEND_DELETE_MESSAGE
socket.on("SERVER_RETURN_DELETE_MESSAGE",(idContent) =>{
    if(idContent){
        const message=document.getElementById(idContent);
        if(message){
            message.remove();
        }
    }
});
// END SERVER_SEND_DELETE_MESSAGE

// Insert Icon to Input

const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    emojiPicker.addEventListener("emoji-click", (e) => {
        const icon = e.detail.unicode;
        inputChat.value = inputChat.value + icon;

        // ghi nhập đoạn văn dài để con trỏ ở cuối đoạn văn thì dùng như dưới
        const End=inputChat.value.length;
        inputChat.setSelectionRange(End,End);
        inputChat.focus();

        showTyping();
    });

    //  Input Keyup


    inputChat.addEventListener("keyup", () => {
        showTyping();
    })


}

// End Input Keyup
// End Insert Icon to Input
// End Show Icon Chat


// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
socket.on("SERVER_RETURN_TYPING", (data) => {
    if (data.type == "show") {
        const bodyChat = document.querySelector(".chat .inner-body");
        const existTyping = elementListTyping.querySelector(`[user-id='${data.userId}']`);
        if (!existTyping) {
            const boxTyping = document.createElement("div");
            boxTyping.classList.add("box-typing");
            boxTyping.setAttribute("user-id", data.userId);


            boxTyping.innerHTML = `
            <div class="box-typing">
                <div class="inner-name">${data.fullName}</div>
                <div class="inner-dots">
                    <span></span>
                    <span></span>        
                    <span></span>
                </div>
            </div>                
        `;

            elementListTyping.appendChild(boxTyping);
            bodyChat.scrollTop = bodyChat.scrollHeight;
        }
    } else {
        const boxTypingRemove = elementListTyping.querySelector(`[user-id='${data.userId}']`);
        if (boxTypingRemove) {
            elementListTyping.removeChild(boxTypingRemove);
        }
    }
});
// End SERVER_RETURN_TYPING



// Preview Full Image
const bodyChatPreviewImage=document.querySelector(".chat .inner-body");

if(bodyChatPreviewImage){
    const gallary=new Viewer(bodyChatPreviewImage);
}
// End Preview Full Image


