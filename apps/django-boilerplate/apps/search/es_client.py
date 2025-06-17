# apps/search/es_client.py
import os
from dotenv import load_dotenv
from elasticsearch import Elasticsearch

load_dotenv()

es = Elasticsearch([os.getenv("ELASTICSEARCH_URL", "http://elasticsearch:9200")])
