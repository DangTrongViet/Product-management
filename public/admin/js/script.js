const url = new URL(location.href);



document.addEventListener("DOMContentLoaded", () => {
    const buttonSearch = document.querySelector("#form-search");
    if (buttonSearch) {
        buttonSearch.addEventListener("submit", (e) => {
            e.preventDefault();
            const keyword = e.target.keyword.value;
            if (keyword) {
                url.searchParams.set("keyword", keyword);
            } else {
                url.searchParams.delete("keyword");
            }
            location.href = url.href;
        });
    }
})

// Thêm DOMContentLoaded để chạy file js k bị lỗi 
document.addEventListener("DOMContentLoaded", () => {
    const buttonStatus = document.querySelectorAll("[button-status]");
    if (buttonStatus.length > 0) {
        buttonStatus.forEach(button => {
            button.addEventListener("click", () => {
                const status = button.getAttribute("button-status");
                if (status) {
                    url.searchParams.set("status", status);
                } else {
                    url.searchParams.delete("status");
                }
                location.href = url.href;
            });
        });
    }
})

// Pagination
document.addEventListener("DOMContentLoaded", () => {
    const buttonPagination = document.querySelectorAll("[button-pagination]");
    buttonPagination.forEach(item => {
        item.addEventListener("click", () => {
            const page = item.getAttribute("button-pagination");
            if (page) {
                const paginationUrl = new URL(window.location.href);
                paginationUrl.searchParams.set("page", page);
                location.href = paginationUrl.href;
            }
        });
    });
})

// End Pagination

// Checkbox Multi
document.addEventListener("DOMContentLoaded", () => {
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    if (checkboxMulti) {
        const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
        const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
        inputCheckAll.addEventListener("click", () => {
            inputsId.forEach(item => {
                console.log(item);
                item.checked = inputCheckAll.checked;
            });
        });
        inputsId.forEach(input => {
            input.addEventListener("click", () => {
                const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
                inputCheckAll.checked = countChecked === inputsId.length;
            });
        });
    }
})
// End Checkbox Multi

// Form Change Multi
document.addEventListener("DOMContentLoaded", () => {
    const formChangeMulti = document.querySelector("[form-change-multi]");
    if (formChangeMulti) {
        formChangeMulti.addEventListener("submit", (e) => {
            e.preventDefault();
            const checkboxMulti = document.querySelector("[checkbox-multi]");
            const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
            const typeChange = e.target.elements.type.value;

            if (typeChange === "delete-all") {
                const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này?");
                if (!isConfirm) return;
            }
            if (inputsChecked.length > 0) {
                let ids = [];
                const inputIds = formChangeMulti.querySelector("input[name='ids']");
                inputsChecked.forEach(input => {
                    const id = input.value;
                    if (typeChange === "change-position") {
                        const position = input.closest("tr").querySelector("input[name='position']").value;
                        ids.push(`${id}-${position}`);
                    } else {
                        ids.push(id);
                    }
                });
                inputIds.value = ids.join(", ");
                formChangeMulti.submit();
            } else {
                alert("Vui lòng chọn ít nhất 1 bản ghi!");
            }
        });
    }
})
// End Form Change Multi

// Show Alert
document.addEventListener("DOMContentLoaded", () => {
    const showAlert = document.querySelector("[show-alert]");
    if (showAlert) {
        const time = parseInt(showAlert.getAttribute("data-time"));
        const closeAlert = showAlert.querySelector("[close-alert]");
        setTimeout(() => {
            showAlert.classList.add("alert-hidden");
        }, time);
        closeAlert.addEventListener("click", () => {
            showAlert.classList.add("alert-hidden");
        });
    }
})
// End Show Alert

// Upload Image
document.addEventListener("DOMContentLoaded", () => {
    const uploadImage = document.querySelector("[upload-image]");
    if (uploadImage) {
        const uploadImageInput = document.querySelector("[upload-image-input]");
        const uploadImagePreview = document.querySelector("[upload-image-preview]");

        uploadImageInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                uploadImagePreview.src = URL.createObjectURL(file);
                const btnClose = document.querySelector("[btn-close]");
                btnClose.style.display = "block";
                uploadImagePreview.style.display = "block";
                btnClose.addEventListener("click", () => {
                    uploadImageInput.value = "";
                    uploadImagePreview.style.display = "none";
                    btnClose.style.display = "none";
                });
            }
        });
    }
})
// End Upload Image

// Sort
document.addEventListener("DOMContentLoaded", () => {
    const sort = document.querySelector("[sort]");
    if (sort) {
        const sortSelect = sort.querySelector("[sort-select]");
        const sortClear = sort.querySelector("[sort-clear]");
        sortSelect.addEventListener("change", (e) => {
            const [key, value] = e.target.value.split("-");
            url.searchParams.set("sortKey", key);
            url.searchParams.set("sortValue", value);
            location.href = url.href;
        });
        sortClear.addEventListener("click", () => {
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");
            location.href = url.href;
        });

        // Thêm selected cho option
        const sortKey = url.searchParams.get("sortKey");
        const sortValue = url.searchParams.get("sortValue");

        if (sortKey && sortValue) {
            const stringSort = `${sortKey}-${sortValue}`;
            const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
            optionSelected.setAttribute("selected", true);
        }
    }
})
// End Sort
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('toggleSiderBtn').addEventListener('click', function () {
        const sider = document.querySelector('.sider');
        const mainContent = document.querySelector('.main-content');
        sider.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
    });
})


