import os
import json
import redis
from dotenv import load_dotenv
from elasticsearch import Elasticsearch
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

load_dotenv()

# Init clients
es = Elasticsearch([os.getenv("ELASTICSEARCH_URL", "http://elasticsearch:9200")])
redis_client = redis.Redis.from_url(os.getenv("REDIS_URL", "redis://redis:6379"))

@api_view(['GET'])
def health_check(request):
    return Response({"status": "healthy", "service": "search"})

@api_view(['POST'])
def search_products(request):
    if not es.indices.exists(index="products"):
        return Response({"detail": "Elasticsearch index not ready."}, status=503)

    try:
        data = request.data
        cache_key = f"search:{hash(str(data))}"
        cached_result = redis_client.get(cache_key)

        if cached_result:
            return Response(json.loads(cached_result))

        query = {
            "bool": {
                "must": [],
                "filter": []
            }
        }

        if data.get("query"):
            query["bool"]["must"].append({
                "multi_match": {
                    "query": data["query"],
                    "fields": ["name^2", "description", "category", "brand"]
                }
            })

        if not query["bool"]["must"]:
            query["bool"]["must"].append({ "match_all": {} })

        if data.get("category"):
            query["bool"]["filter"].append({
                "term": {"category.keyword": data["category"]}
            })

        if data.get("brand"):
            query["bool"]["filter"].append({
                "term": {"brand.keyword": data["brand"]}
            })

        if data.get("min_price") or data.get("max_price"):
            price_range = {}
            if data.get("min_price"):
                price_range["gte"] = data["min_price"]
            if data.get("max_price"):
                price_range["lte"] = data["max_price"]
            query["bool"]["filter"].append({
                "range": {"price": price_range}
            })

        size = int(data.get("size", 20))
        page = int(data.get("page", 1))
        from_offset = (page - 1) * size

        response = es.search(
            index="products",
            body={
                "query": query,
                "from": from_offset,
                "size": size,
                "sort": [{"_score": {"order": "desc"}}]
            }
        )

        products = []
        for hit in response["hits"]["hits"]:
            source = hit["_source"]
            products.append({
                "id": hit["_id"],
                "name": source["name"],
                "description": source.get("description", ""),
                "price": source.get("price"),
                "category": source.get("category"),
                "brand": source.get("brand"),
                "image_url": source.get("image_url", ""),
                "score": hit["_score"]
            })

        result = {
            "products": products,
            "total": response["hits"]["total"]["value"],
            "page": page,
            "size": size
        }

        redis_client.setex(cache_key, 300, json.dumps(result))
        return Response(result)

    except Exception as e:
        return Response({"detail": f"Search error: {str(e)}"}, status=500)

@api_view(['GET'])
def get_suggestions(request):
    try:
        q = request.GET.get("q", "")
        if len(q) < 2:
            return Response({"detail": "Query too short"}, status=400)

        response = es.search(
            index="products",
            body={
                "suggest": {
                    "product_suggest": {
                        "prefix": q,
                        "completion": {
                            "field": "suggest",
                            "size": 10
                        }
                    }
                }
            }
        )

        suggestions = [option["text"] for option in response["suggest"]["product_suggest"][0]["options"]]
        return Response({"suggestions": suggestions})

    except Exception as e:
        return Response({"detail": f"Suggestions error: {str(e)}"}, status=500)

@api_view(['POST'])
def index_product(request):
    try:
        data = request.data
        doc = {
            "name": data["name"],
            "description": data.get("description", ""),
            "price": data["price"],
            "category": data["category"],
            "brand": data["brand"],
            "image_url": data.get("image_url", ""),
            "suggest": {
                "input": [data["name"], data["brand"], data["category"]],
                "weight": 1
            }
        }

        es.index(index="products", id=data["id"], body=doc)

        for key in redis_client.scan_iter(match="search:*"):
            redis_client.delete(key)

        return Response({"message": "Product indexed successfully"})

    except Exception as e:
        return Response({"detail": f"Indexing error: {str(e)}"}, status=500)
