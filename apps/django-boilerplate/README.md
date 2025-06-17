```
python3 --version
pip3 --version
python -m venv venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\activate        # Linux: source venv/bin/activate
pip install -r requirements.txt

pip install django
django-admin --version
django-admin startproject django_boilerplate
pip install elasticsearch redis psycopg2-binary python-dotenv
python manage.py startapp apps/search
pip freeze > requirements.txt
sudo apt update
sudo apt install redis-server -y
redis-cli ping
PONG

sudo service redis-server start

sudo systemctl start redis


(.venv) maearon@maearon:~/code/shop-php/apps/django-boilerplate$ sudo lsof -i :6379
COMMAND      PID  USER FD   TYPE DEVICE SIZE/OFF NODE NAME
redis-ser 106745 redis 6u  IPv4 366257      0t0  TCP view-localhost:redis (LISTEN)
redis-ser 106745 redis 7u  IPv6 366258      0t0  TCP ip6-localhost:redis (LISTEN)



sudo systemctl stop redis


POST http://localhost:8000/api/search/
Body: { "query": "shirt" }

```

```
Elasticsearch không tìm thấy index products, nên truy vấn "shirt" không thực hiện được.

✅ Cách khắc phục
✅ 1. Tạo index products thủ công (tạm thời)
Bạn có thể dùng cURL hoặc một tool như Postman để tạo index trước:

bash
Sao chép
Chỉnh sửa
curl -X PUT "http://localhost:9200/products" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "name":    { "type": "text" },
      "price":   { "type": "float" },
      "brand":   { "type": "text" },
      "category": { "type": "keyword" }
    }
  }
}'
✅ Sau đó thử lại POST /api/search/ → sẽ hoạt động nếu có document phù hợp.

✅ 2. (Khuyên dùng) Thêm đoạn tạo index tự động trong startup code
Trong file khởi tạo Elasticsearch client, thêm logic:

python
Sao chép
Chỉnh sửa
from elasticsearch import Elasticsearch

es = Elasticsearch("http://elasticsearch:9200")

def create_index_if_not_exists():
    index_name = "products"
    if not es.indices.exists(index=index_name):
        es.indices.create(index=index_name, body={
            "mappings": {
                "properties": {
                    "name":    { "type": "text" },
                    "price":   { "type": "float" },
                    "brand":   { "type": "text" },
                    "category": { "type": "keyword" }
                }
            }
        })
Sau đó gọi create_index_if_not_exists() khi app khởi động.

✅ 3. Đừng quên seed dữ liệu
Nếu index products trống, bạn vẫn sẽ nhận kết quả rỗng. Thêm dữ liệu như sau:

bash
Sao chép
Chỉnh sửa
curl -X POST "http://localhost:9200/products/_doc" -H 'Content-Type: application/json' -d'
{
  "name": "Adidas Shirt",
  "price": 29.99,
  "brand": "Adidas",
  "category": "shirt"
}'
✅ Tóm lại
Việc cần làm	Trạng thái
Tạo index products	❌ Chưa có
Đã downgrade Elastic version	✅ Rồi
Query /api/search/	🚫 Bị lỗi vì chưa có index
Thêm data vào index	❌ Chưa có

🔧 Bạn hãy tạo index products rồi thử lại truy vấn. Nếu muốn mình viết đoạn Python seed data nhanh, cứ gửi code views.py hoặc file search() mình viết luôn.
```
```
docker compose exec api-ruby bundle exec rake products:reindex
```
