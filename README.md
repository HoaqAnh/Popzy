# Hướng dẫn Cài đặt và Chạy Dự án

Dự án này bao gồm 3 thành phần chính:
1.  **Backend**: Java Spring Boot (Xử lý logic, API, Database).
2.  **Model**: Python (Xử lý các tác vụ AI/ML).
3.  **Frontend**: ReactJS + Vite (Giao diện người dùng).

---

## Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:

* **Java JDK 17+** (cho Backend).
* **Node.js & npm** (cho Frontend).
* **Python 3.10** (cho Model).
* **MySQL Server**: Đang chạy ở cổng `3306`.
* **Redis**: Đang chạy ở cổng `6379` (Password mặc định cấu hình là `admin123`).

---

## Hướng dẫn cài đặt chi tiết

### BƯỚC 1: Cấu hình Database & Redis

1.  Mở MySQL Workbench hoặc Terminal, tạo một database rỗng với tên là `Bds`:
    ```sql
    CREATE DATABASE Bds;
    ```
2.  Đảm bảo Redis server đang chạy. Nếu bạn dùng Docker, có thể chạy nhanh bằng lệnh:
    ```bash
    docker run --name my-redis -p 6379:6379 -d redis redis-server --requirepass "admin123"
    ```

---

### BƯỚC 2: Thiết lập Backend (Spring Boot)

1.  Di chuyển vào thư mục backend:
    ```bash
    cd backend
    ```

2.  **Cấu hình biến môi trường**:
    * Copy file `application.properties.example` thành `application.properties`
    * Mở file `src/main/resources/application.properties`.
    * Thay thế các ngoặc nhọn `{...}` bằng thông tin thực tế của bạn (Google OAuth, Cloudinary, Email App Password, JWT Secret).
    
    *Lưu ý quan trọng*:
    * `spring.datasource.password`: Mặc định đang là `admin123`, hãy sửa lại nếu mật khẩu MySQL của bạn khác.
    * `spring.jpa.hibernate.ddl-auto=update`: Lần đầu chạy sẽ tự động tạo bảng trong database `Bds`.

3.  Chạy ứng dụng:
    ```bash
    # Nếu dùng Windows
    mvnw spring-boot:run

    # Nếu dùng Linux/Mac
    ./mvnw spring-boot:run
    ```
    > Backend sẽ khởi chạy tại: `http://localhost:8080`

---

### BƯỚC 3: Thiết lập AI Model (Python 3.10)

1.  Di chuyển vào thư mục model:
    ```bash
    cd ../model
    ```

2.  (Khuyên dùng) Tạo và kích hoạt môi trường ảo:
    ```bash
    # Windows
    py -3.10 -m venv venv
    .\venv\Scripts\activate

    # Mac/Linux
    python3.10 -m venv venv
    source venv/bin/activate
    ```

3.  Cài đặt các thư viện cần thiết:
    ```bash
    pip install -r requirements.txt
    ```

4.  Chạy Model Server:
    ```bash
    python app.py
    ```
    > Model server sẽ khởi chạy tại: `http://localhost:8000` (Theo cấu hình mặc định).

---

### BƯỚC 4: Thiết lập Frontend (ReactJS)

1.  Di chuyển vào thư mục frontend:
    ```bash
    cd ../frontend
    ```

2.  Cài đặt các packages:
    ```bash
    npm install
    ```

3.  **Cấu hình biến môi trường**:
    * Copy file `.env.example` thành `.env`:
        ```bash
        cp .env.example .env
        ```
    * Cập nhật thông tin trong file `.env`:
        ```properties
        VITE_API_URL=http://localhost:8080/api/v1
        VITE_MODEL_API_URL=http://localhost:8000/
        VITE_CLOUDINARY_CLOUD_NAME=tên_cloud_của_bạn
        ```
    * **QUAN TRỌNG**: Giá trị `VITE_CLOUDINARY_CLOUD_NAME` ở đây **bắt buộc phải trùng khớp** với `cloudinary.cloud_name` bạn đã điền trong file `application.properties` của Backend thì việc hiển thị ảnh mới hoạt động chính xác.

4.  Chạy dự án:
    ```bash
    npm run dev
    ```
    > Frontend sẽ khởi chạy tại: `http://localhost:5173`

---

## Tổng hợp các Port mặc định

| Service | Port | URL |
| :--- | :--- | :--- |
| Frontend | `5173` | http://localhost:5173 |
| Backend API | `8080` | http://localhost:8080 |
| Model API | `8000` | http://localhost:8000 |
| MySQL | `3306` | jdbc:mysql://localhost:3306/Bds |
| Redis | `6379` | localhost:6379 |
