window.onload = () => {
    const buttonchangeStatus = document.querySelectorAll("[button-change-status]");
    if (buttonchangeStatus.length > 0) {
        const formchangeStatus = document.querySelector("#form-change-status");
        buttonchangeStatus.forEach(item => {
            item.addEventListener("click", () => {
                const currentStatus = item.getAttribute("data-status");
                const id = item.getAttribute("data-id");
                //Nếu dùng phương thức method: POST thì phải thêm ?_method=PATCH nhưu bên dưới.
                const changeStatus = currentStatus == "active" ? "inactive" : "active";
                const action = `${formchangeStatus.getAttribute("data-path")}/${changeStatus}/${id}?_method=PATCH`;
                formchangeStatus.setAttribute("action", action);
                formchangeStatus.submit();
            })

        })
    }
}

//Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            //confimr ok thì trả về true, ngược lại.
            const isConfirm = confirm("Bạn có chắc muốn xóa không");
            if (isConfirm) {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;

                //Dùng hàm submit() để gửi form lên backend.
                formDeleteItem.submit();

            }
        });
    })
}

//End Delete Item
