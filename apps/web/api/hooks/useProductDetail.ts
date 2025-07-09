import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { Product } from "@/types/product"
import rubyService from "@/api/services/rubyService"

const CACHE_TTL = 1000 * 60 * 5 // 5 phút

// ✅ Hàm fetch dữ liệu
async function fetchProduct(slug: string, model: string): Promise<Product> {
  return await rubyService.getProductBySlugAndVariant(slug, model)
}

// ✅ Custom hook dùng React Query
export function useProductDetail(slug: string, model: string): UseQueryResult<Product, Error> {
  return useQuery<Product, Error>({
    queryKey: ["productDetail", slug, model],
    queryFn: () => fetchProduct(slug, model),
    staleTime: CACHE_TTL,
    gcTime: CACHE_TTL * 2, // ✅ dùng `gcTime` thay vì `cacheTime` trong react-query v6+
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}
