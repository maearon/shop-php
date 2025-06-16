from django.core.management.base import BaseCommand
from apps.search.consumers.product_consumer import start_consuming

class Command(BaseCommand):
    help = 'Start RabbitMQ consumer to index product events into Elasticsearch'

    def handle(self, *args, **kwargs):
        start_consuming()
