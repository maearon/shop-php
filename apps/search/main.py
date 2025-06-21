from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from elasticsearch import Elasticsearch
import redis
import psycopg2
import os
from typing import List, Optional
from pydantic import BaseModel
import json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Adidas Search Service", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize connections
es = Elasticsearch([os.getenv("ELASTICSEARCH_URL", "http://localhost:9200")])
redis_client = redis.Redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379"))

# Database connection
def get_db_connection():
    return psycopg2.connect(os.getenv("DATABASE_URL"))

class SearchQuery(BaseModel):
    query: str
    category: Optional[str] = None
    brand: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    size: Optional[int] = 20
    page: Optional[int] = 1

class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    brand: str
    image_url: str

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "search"}

@app.post("/search")
async def search_products(search_query: SearchQuery):
    try:
        # Check cache first
        cache_key = f"search:{hash(str(search_query.dict()))}"
        cached_result = redis_client.get(cache_key)
        
        if cached_result:
            return json.loads(cached_result)

        # Build Elasticsearch query
        query = {
            "bool": {
                "must": [],
                "filter": []
            }
        }

        # Text search
        if search_query.query:
            query["bool"]["must"].append({
                "multi_match": {
                    "query": search_query.query,
                    "fields": ["name^2", "description", "category", "brand"]
                }
            })

        # Filters
        if search_query.category:
            query["bool"]["filter"].append({
                "term": {"category.keyword": search_query.category}
            })

        if search_query.brand:
            query["bool"]["filter"].append({
                "term": {"brand.keyword": search_query.brand}
            })

        if search_query.min_price or search_query.max_price:
            price_range = {}
            if search_query.min_price:
                price_range["gte"] = search_query.min_price
            if search_query.max_price:
                price_range["lte"] = search_query.max_price
            
            query["bool"]["filter"].append({
                "range": {"price": price_range}
            })

        # Execute search
        from_offset = (search_query.page - 1) * search_query.size
        
        response = es.search(
            index="products",
            body={
                "query": query,
                "from": from_offset,
                "size": search_query.size,
                "sort": [{"_score": {"order": "desc"}}]
            }
        )

        # Format results
        products = []
        for hit in response["hits"]["hits"]:
            source = hit["_source"]
            products.append({
                "id": hit["_id"],
                "name": source["name"],
                "description": source.get("description", ""),
                "price": source["price"],
                "category": source["category"],
                "brand": source["brand"],
                "image_url": source.get("image_url", ""),
                "score": hit["_score"]
            })

        result = {
            "products": products,
            "total": response["hits"]["total"]["value"],
            "page": search_query.page,
            "size": search_query.size
        }

        # Cache result for 5 minutes
        redis_client.setex(cache_key, 300, json.dumps(result))

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search error: {str(e)}")

@app.get("/suggestions")
async def get_suggestions(q: str = Query(..., min_length=2)):
    try:
        # Get search suggestions
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

        suggestions = []
        for suggestion in response["suggest"]["product_suggest"][0]["options"]:
            suggestions.append(suggestion["text"])

        return {"suggestions": suggestions}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Suggestions error: {str(e)}")

@app.post("/index/product")
async def index_product(product: Product):
    try:
        # Index product in Elasticsearch
        doc = {
            "name": product.name,
            "description": product.description,
            "price": 0,
            "category": product.category,
            "brand": product.brand,
            "image_url": product.image_url,
            "suggest": {
                "input": [product.name, product.brand, product.category],
                "weight": 1
            }
        }

        es.index(index="products", id=product.id, body=doc)
        
        # Clear related cache
        pattern = "search:*"
        for key in redis_client.scan_iter(match=pattern):
            redis_client.delete(key)

        return {"message": "Product indexed successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Indexing error: {str(e)}")

@app.on_event("startup")
async def startup_event():
    # Create Elasticsearch index if it doesn't exist
    if not es.indices.exists(index="products"):
        mapping = {
            "mappings": {
                "properties": {
                    "name": {"type": "text", "analyzer": "standard"},
                    "description": {"type": "text"},
                    "price": {"type": "float"},
                    "category": {"type": "keyword"},
                    "brand": {"type": "keyword"},
                    "image_url": {"type": "keyword"},
                    "suggest": {
                        "type": "completion",
                        "analyzer": "simple",
                        "preserve_separators": True,
                        "preserve_position_increments": True,
                        "max_input_length": 50
                    }
                }
            }
        }
        es.indices.create(index="products", body=mapping)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 3004)))
