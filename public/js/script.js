// Đảm bảo mã chạy sau khi DOM được tải hoàn chỉnh
document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các liên kết trong menu con
    const subMenuLinks = document.querySelectorAll('.sub-menu a');

    // Thêm sự kiện nhấp chuột cho từng liên kết
    subMenuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // Ngăn chặn hành vi mặc định của liên kết
            event.preventDefault();

            // Lấy URL của liên kết
            const url = this.getAttribute('href');

            // Chuyển hướng đến URL mới
            window.location.href = url;
        });
    });
});



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