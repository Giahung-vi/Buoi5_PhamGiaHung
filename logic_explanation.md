# Giải Thích Chi Tiết Về Cách Dùng `new Date().getHours()` Trong JavaScript

Tài liệu này giải thích cơ chế hoạt động, cú pháp và cách ứng dụng hàm `new Date().getHours()` để xác định thời gian thực trong JavaScript, cụ thể là cho chức năng hiển thị lời chào theo các buổi trong ngày (sáng, chiều, tối).

---

## 1. Đối tượng `Date` trong JavaScript

Trong JavaScript, đối tượng toàn cục `Date` dùng để làm việc với ngày tháng và thời gian.

### Cú pháp khởi tạo:
```javascript
const now = new Date();
console.log(now);
```

- Khi gọi toán tử `new Date()` không truyền tham số, JavaScript sẽ tạo ra một đối tượng đại diện cho **thời điểm chính xác hiện tại** (ngày, giờ, phút, giây, mili-giây) dựa trên đồng hồ hệ thống của thiết bị đang chạy trình duyệt.
- Ví dụ đầu ra của `now`:
  ```text
  Mon Oct 26 2026 15:40:31 GMT+0700 (Indochina Time)
  ```

---

## 2. Phương thức `.getHours()` là gì?

`.getHours()` là một phương thức tích hợp sẵn (built-in method) của đối tượng `Date`.

### Đặc điểm chính:
1. **Chức năng:** Trích xuất phần **giờ** từ đối tượng thời gian hiện tại theo **giờ địa phương (Local Time)** của người dùng.
2. **Kiểu dữ liệu trả về:** Một số nguyên (`number`) nằm trong khoảng từ `0` đến `23`.
   - Định dạng sử dụng hệ thống **24 giờ** (không phải 12 giờ AM/PM).

### Bảng đối chiếu giá trị trả về của `.getHours()`:

| Giá trị trả về | Thời gian thực tế | Quy ước buổi thông dụng |
| :---: | :--- | :--- |
| `0` | 00:00 (Nửa đêm) | Đêm / Rạng sáng |
| `1` - `4` | 01:00 - 04:59 | Đêm / Khuya |
| `5` - `11` | 05:00 - 11:59 | Buổi sáng |
| `12` - `17` | 12:00 - 17:59 | Buổi chiều |
| `18` - `21` | 18:00 - 21:59 | Buổi tối |
| `22` - `23` | 22:00 - 23:59 | Đêm muộn |

---

## 3. Phân tích cú pháp chuỗi phương thức `new Date().getHours()`

Bạn có thể viết tách ra làm 2 bước hoặc gộp lại thành 1 dòng duy nhất:

### Cách viết tách biệt (Dễ đọc cho người mới bắt đầu):
```javascript
// Bước 1: Tạo đối tượng Date chứa thời điểm hiện tại
const now = new Date();

// Bước 2: Gọi phương thức getHours() để lấy số giờ
const currentHour = now.getHours();

console.log(currentHour); // Ví dụ: 15 (nghĩa là 3 giờ chiều)
```

### Cách viết gộp (Method Chaining - Chuỗi phương thức):
```javascript
const currentHour = new Date().getHours();
```
- Cơ chế: `new Date()` được thực thi trước để tạo ra một đối tượng thời gian tức thời, sau đó phương thức `.getHours()` được gọi ngay lập tức trên đối tượng đó để lấy ra giá trị giờ.

---

## 4. Ứng dụng vào logic thông báo chào mừng trong `data.js`

Dựa trên số giờ lấy được, ta dùng cấu trúc điều kiện `if...else if...else` để xác định thông điệp phù hợp:

```javascript
function getGreetingMessage() {
    // Lấy số giờ hiện tại (0 - 23)
    const currentHour = new Date().getHours();

    let greeting = "";

    if (currentHour >= 5 && currentHour < 12) {
        // Từ 05:00 đến 11:59: Buổi sáng
        greeting = "Chào buổi sáng! Chúc bạn một ngày mới ngập tràn năng lượng!";
    } else if (currentHour >= 12 && currentHour < 18) {
        // Từ 12:00 đến 17:59: Buổi chiều
        greeting = "Chào buổi chiều! Chúc bạn một buổi làm việc và học tập hiệu quả!";
    } else if (currentHour >= 18 && currentHour < 22) {
        // Từ 18:00 đến 21:59: Buổi tối
        greeting = "Chào buổi tối! Chúc bạn có thời gian nghỉ ngơi thư giãn vui vẻ!";
    } else {
        // Từ 22:00 đến 04:59 hôm sau: Đêm muộn
        greeting = "Khuya rồi, bạn giữ gìn sức khỏe và chúc bạn ngủ ngon nhé!";
    }

    return greeting;
}

// Gọi hiển thị thông báo ra màn hình
alert(getGreetingMessage());
```

---

## 5. Những lưu ý quan trọng khi sử dụng

1. **Phụ thuộc vào thời gian phía Client (Client-side Time):**
   - `new Date()` lấy theo đồng hồ trên máy tính/điện thoại của người dùng, không phải giờ máy chủ (server). Nếu người dùng chỉnh sai giờ hệ thống trên máy họ, kết quả trả về sẽ theo giờ bị chỉnh đó.
2. **Khác biệt giữa Local Time và UTC:**
   - `.getHours()`: Lấy giờ theo múi giờ địa phương của thiết bị (ví dụ Việt Nam là UTC+7).
   - `.getUTCHours()`: Lấy giờ theo Giờ Phối hợp Quốc tế (UTC 0). Đối với lời chào người dùng địa phương, **luôn dùng `.getHours()`**.
3. **Các phương thức thời gian liên quan khác của `Date`:**
   - `getMinutes()`: Lấy số phút (0 - 59).
   - `getSeconds()`: Lấy số giây (0 - 59).
   - `getDay()`: Lấy thứ trong tuần (0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy).
   - `getDate()`: Lấy ngày trong tháng (1 - 31).
   - `getMonth()`: Lấy tháng trong năm (0: Tháng 1, ..., 11: Tháng 12).
   - `getFullYear()`: Lấy năm 4 chữ số (ví dụ: 2026).
