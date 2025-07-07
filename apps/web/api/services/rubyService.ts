// 📦 Product Service API
import api from "@/api/client"
import { ApiResponse } from "@/types/common/api"
import { Product } from "@/types/product"

export interface ProductQuery {
  slug: string
  page?: number       // 👈 đổi từ string => number
  per_page?: number
  sort?: string
  gender?: string
  category?: string
  activity?: string
  sport?: string; // ✅ thêm dòng này nếu bạn cần
  product_type?: string
  size?: string
  color?: string
  material?: string
  brand?: string
  model?: string
  collection?: string
  min_price?: number // 👈 bỏ string
  max_price?: number // 👈 bỏ string
  shipping?: string
}

export interface ProductMeta {
  current_page: number
  total_pages: number
  total_count: number
  per_page: number
  filters_applied: Record<string, any>
  category_info: {
    title: string
    breadcrumb: string
    description: string
  }
}

export type ProductListData = {
  products: Product[]
  meta: ProductMeta
}

export type ProductListResponse = ApiResponse<ProductListData>

const rubyService = {
  getProducts: (params: ProductQuery): Promise<ProductListResponse> =>
    api.get("/products", { params }),

  getProductDetail: (slug: string, modelNumber: string): Promise<ApiResponse<Product>> =>
  api.get(`/products/${slug}/${modelNumber}`),
}

export default rubyService
