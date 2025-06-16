import os
import json
import django
import pika
from elasticsearch import Elasticsearch

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')  # sửa lại nếu bạn đặt tên project khác
django.setup()

es = Elasticsearch([os.getenv("ELASTICSEARCH_URL", "http://elasticsearch:9200")])

def callback(ch, method, properties, body):
    try:
        event = json.loads(body)
        if event["event"] == "product.created":
            data = event["data"]
            doc = {
                "name": data["title"],
                "price": data["price"],
                "image_url": data.get("image_url", ""),
                "availableSizes": data.get("availableSizes", []),
                "currencyFormat": data.get("currency", "$"),
                "suggest": {
                    "input": [data["title"]],
                    "weight": 1
                }
            }
            es.index(index="products", id=data["id"], body=doc)
            print(f"[x] Indexed product {data['id']}")
    except Exception as e:
        print(f"[!] Error processing message: {str(e)}")


def start_consuming():
    rabbitmq_host = os.getenv("RABBITMQ_HOST", "localhost")

    connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_host))
    channel = connection.channel()
    channel.exchange_declare(exchange="product_events", exchange_type="topic", durable=True)

    result = channel.queue_declare('', exclusive=True)
    queue_name = result.method.queue

    channel.queue_bind(exchange="product_events", queue=queue_name, routing_key="product.created")

    print('[*] Waiting for product.created events. To exit press CTRL+C')
    channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

    channel.start_consuming()
