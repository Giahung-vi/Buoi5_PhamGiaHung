/**
 * File: data.js
 * Chức năng: Hiển thị thông báo chào mừng theo thời gian thực khi người dùng truy cập trang web.
 * Tác giả: Phạm Gia Hưng
 */

/**
 * Hàm lấy câu chào mừng dựa trên giờ thực tế của hệ thống
 * @returns {string} Lời chào mừng tương ứng với thời gian trong ngày
 */
function getGreetingMessage() {
    // 1. Tạo đối tượng thời gian hiện tại
    const now = new Date();

    // 2. Lấy số giờ hiện tại (từ 0 đến 23)
    const currentHour = now.getHours();

    let greeting = "";

    // 3. Phân chia các khung giờ trong ngày:
    // - Từ 05:00 đến 11:59: Buổi sáng
    // - Từ 12:00 đến 17:59: Buổi chiều
    // - Từ 18:00 đến 21:59: Buổi tối
    // - Từ 22:00 đến 04:59: Đêm muộn / Chúc ngủ ngon
    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Chào buổi sáng! Chúc bạn một ngày mới ngập tràn năng lượng!";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Chào buổi chiều! Chúc bạn một buổi làm việc và học tập hiệu quả!";
    } else if (currentHour >= 18 && currentHour < 22) {
        greeting = "Chào buổi tối! Chúc bạn có thời gian nghỉ ngơi thư giãn vui vẻ!";
    } else {
        greeting = "Khuya rồi, bạn giữ gìn sức khỏe và chúc bạn ngủ ngon nhé!";
    }

    return greeting;
}

/**
 * Hàm hiển thị thông báo chào mừng đến người dùng
 */
function showWelcomeGreeting() {
    const greeting = getGreetingMessage();

    // Hiển thị thông báo pop-up thông qua alert
    alert(greeting);

    // Ghi log ra Console để tiện kiểm tra và chấm bài
    console.log(`[Welcome] ${greeting} (Thời gian thực: ${new Date().toLocaleTimeString()} - Giờ: ${new Date().getHours()}h)`);
}

// Tự động kích hoạt thông báo khi trang web tải xong DOM
if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", () => {
        // Trì hoãn nhẹ 300ms để trình duyệt render trang trước khi pop-up xuất hiện
        setTimeout(showWelcomeGreeting, 300);
    });
}
