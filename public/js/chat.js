import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'


// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");

if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;

        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content);
            e.target.elements.content.value = "";
        }
    })
}

// End CLIENT_SEND_MESSAGE


// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector(".chat[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    let htmlName = "";

    const div = document.createElement("div");
    if (myId == data.userId) {
        div.classList.add("inner-outgoing");

    } else {
        div.classList.add("inner-incoming");
        htmlName = `<div class="inner-name"> ${data.fullName}</div> `;
    }
    div.classList.add("inner-incoming");
    div.innerHTML = `
        ${htmlName}
    <div class="inner-content"> ${data.content}</div>`

    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
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
        tooltip.classList.toggle('shown');
    }
};

// End Show Popup

// Insert Icon to Input
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    emojiPicker.addEventListener("emoji-click", (e) => {
        const icon = e.detail.unicode;
        inputChat.value = inputChat.value + icon;
    });

    //  Input Keyup
    inputChat.addEventListener("keyup",() => {
        socket.emit("CLIENT_SEND_TYPING","show");
    })
    // End Input Keyup
}
// End Insert Icon to Input
// End Show Icon Chat


// SERVER_RETURN_TYPING
socket.on("SERVER_RETURN_TYPING",(data) =>{
    console.log(data);
});
// End SERVER_RETURN_TYPING
