// Chuc nang add friends
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]")

if (listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add");

            const userId = button.getAttribute("btn-add-friend");

            socket.emit("CLIENT_ADD_FRIEND", userId);
        });
    });
}

// Het Chuc nang add friends

// Chuc nang Huy yeu cau
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]")
if (listBtnCancelFriend.length > 0) {
    listBtnCancelFriend.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.remove("add");

            const userId = button.getAttribute("btn-cancel-friend");

            socket.emit("CLIENT_CANCEL_FRIEND", userId);
        });
    });
}

// Het Chuc nang Huy yeu cau


// Chuc nang tu choi ket ban
const refuseFriend = (button) => {
    button.addEventListener("click", () => {
        button.closest(".box-user").classList.add("refuse");

        const userId = button.getAttribute("btn-refuse-friend");

        socket.emit("CLIENT_REFUSE_FRIEND", userId);
    });

}
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]")
if (listBtnRefuseFriend.length > 0) {
    listBtnRefuseFriend.forEach((button) => {
        refuseFriend(button);
    });
}

// Het Chuc nang tu choi ket ban


// Chuc nang chap nhan ket ban
const acceptFriend = (button) => {
    button.addEventListener("click", () => {
        button.closest(".box-user").classList.add("accepted");

        const userId = button.getAttribute("btn-accept-friend");

        socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
}
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]")
if (listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach((button) => {
        acceptFriend(button);
    });
}

// Het Chuc nang chap nhan ket ban


// SERVER_RETURN_LENGTH_ACCEPT_FRIENDS
const badgeUsersAccept = document.querySelector("[badge-users-accept]");
if (badgeUsersAccept) {
    const userId = badgeUsersAccept.getAttribute("badge-users-accept");
    socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIENDS", (data) => {
        if (data.userId === userId) {
            badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
        }
    });
}
// End SERVER_RETURN_LENGTH_ACCEPT_FRIENDS


// SERVER_RETURN_INFO_ACCEPT_FRIEND


socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    // Trang loi moi ket ban
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    if (dataUsersAccept){
        // Ve user ra giao dien
        // Tao ra 1 the roi dung the do inner-html
        const div = document.createElement("div");
        div.classList.add("col-6");
        div.setAttribute("user-id", data.infoUserA._id);

        div.innerHTML = `
        <div class="col-6"> 
            <div class="box-user">
                <div class="inner-avatar">
                    <img src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg" alt="${data.infoUserA.fullName}">
                </div>
                <div class="inner-info">
                    <div class="inner-name">
                        ${data.infoUserA.fullName}
                    </div>
                    <div class="inner-buttons">
                        <button 
                            class="bnt btn-sm btn-primary mr-1" 
                            btn-accept-friend="${data.infoUserA._id}"
                        >
                            Chấp nhận
                        </button>
                        <button 
                            class="btn btn-sm btn-secondary mr-1" 
                            btn-refuse-friend="${data.infoUserA._id}"
                        >
                            Xóa
                        </button>
                        <button 
                            class="btn btn-sm btn-secondary mr-1" 
                            btn-deleted-friend="btn-deleted-friend" 
                            disabled="disabled"
                        >
                            Đã xóa
                        </button>
                        <button 
                            class="btn btn-sm btn-secondary mr-1" 
                            btn-accepted-friend="btn-accepted-friend" 
                            disabled="disabled"
                        >
                            Đã chấp nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>

        `

        dataUsersAccept.appendChild(div);

        // Het ve ra giao dien

        // Huy loi moi kb
        const buttonRefuse = div.querySelector("[btn-refuse-friend]");
        refuseFriend(buttonRefuse);

        // Het huy loi moi kb

        // Chap nhan loi moi kb
        const buttonAccept = div.querySelector("[btn-accept-friend]");
        acceptFriend(buttonAccept);

        // Het chap nhan loi moi kb
    }
    // Trang danh sach nguoi dung
    const dataUserNotFriend = document.querySelector("[data-users-not-friend]");

    if (dataUserNotFriend) {
        const userId = dataUserNotFriend.getAttribute("data-users-not-friend");
        if (userId === data.userId) {
            const boxUserRemove = dataUserNotFriend.querySelector(`[user-id='${data.infoUserA._id}']`);
            if (boxUserRemove) {
                dataUserNotFriend.removeChild(boxUserRemove);
            }
        }
    }
});
// End SERVER_RETURN_INFO_ACCEPT_FRIEND


// SERVER_RETURN_USER_ID_CANCEL_FRIEND

socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
    const userIdA = data.userIdA;
    const boxUserRemove = document.querySelector(`[user-id='${userIdA}']`);
    if (boxUserRemove) {
        const dataUsersAccept = document.querySelector("[data-users-accept]");
        const userIdB = badgeUsersAccept.getAttribute("[badge-users-accept]");
        if (userIdB === data.userIdB) {
            dataUsersAccept.removeChild(boxUserRemove);
        }
    }
});

// End SERVER_RETURN_USER_ID_CANCEL_FRIEND



