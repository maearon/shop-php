# Sử dụng image chính thức của Python
FROM python:3.11-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file requirements vào container trước để tận dụng cache
COPY requirements.txt .

# Cài đặt các thư viện phụ thuộc
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn Django vào container
COPY . .

# Mặc định chạy lệnh collectstatic nếu có, và migrate DB
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
