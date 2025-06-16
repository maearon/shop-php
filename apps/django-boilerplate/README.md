```
python3 --version
pip3 --version
python3 -m venv venv
source venv/bin/activate
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