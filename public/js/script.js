
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('li > a');
    console.log("hi")
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>

            const parentLi = this.parentElement;

            // Toggle class 'active' để ẩn/hiện menu con
            parentLi.classList.toggle('active');
        });
    });
});