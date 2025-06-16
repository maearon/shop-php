FROM python:3.11-slim

WORKDIR /app

COPY apps/django-boilerplate /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "django_boilerplate.wsgi:application", "--bind", "0.0.0.0:8000"]
