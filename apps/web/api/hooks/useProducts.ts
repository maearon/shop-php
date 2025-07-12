import { useQuery, UseQueryResult } from "@tanstack/react-query"
import rubyService from "@/api/services/rubyService"
import { Product, ProductFilters, ProductsResponse } from "@/types/product"

const CACHE_TTL = 1000 * 60 * 5 // 5 phút

// ✅ Hàm fetch dữ liệu chi tiết 1 sản phẩm
async function fetchProduct(slug: string, model: string): Promise<Product> {
  return await rubyService.getProductBySlugAndVariant(slug, model)
}

// ✅ Custom hook dùng để lấy chi tiết sản phẩm
export function useProductDetail(slug: string, model: string): UseQueryResult<Product, Error> {
  return useQuery<Product, Error>({
    queryKey: ["productDetail", slug, model],
    queryFn: () => fetchProduct(slug, model),
    staleTime: CACHE_TTL,
    gcTime: CACHE_TTL * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}

// ✅ Custom hook dùng để lấy danh sách sản phẩm (không còn fallback)
export function useProducts(filters: ProductFilters = {}) {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", filters],
    queryFn: () => rubyService.getProducts(filters as any),
    staleTime: CACHE_TTL,
    gcTime: CACHE_TTL * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  })
}
