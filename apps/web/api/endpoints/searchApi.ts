import api from "@/api/client";
import { Product } from "./productApi";

// Define the SearchFiltersType interface if not already imported
export interface SearchFiltersType {
  query?: string
  page?: number
  size?: number
  category?: string
  brand?: string
  gender?: string
  sport?: string
  min_price?: number
  max_price?: number
  sort?: string
}

export interface SearchResponse {
  products: Product[]
  total: number
  page: number
  size: number
}

export interface SearchFilters {
  query?: string
  category?: string
  brand?: string
  gender?: string
  sport?: string
  min_price?: number
  max_price?: number
  size?: number
  page?: number
  sort?: string
}


const searchApi = {
  // Search APIs (Django Python - search service via Rails proxy)
  async searchProducts(filters: SearchFilters = {}): Promise<SearchResponse> {
    return api.post("/search/products", filters)
  }
};

export default searchApi;
