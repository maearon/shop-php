import { useQuery } from "@tanstack/react-query"
import rubyService, { ProductQuery } from "@/api/services/rubyService"
import type { ProductListData } from "@/api/services/rubyService"

export const useProducts = (query: ProductQuery) => {
  return useQuery<ProductListData, Error>({
    queryKey: ["products", query],
    queryFn: async () => {
      const response = await rubyService.getProducts(query)
      return response.data // ✅ Lấy phần `data` từ API response
    },
    placeholderData: (prevData) => prevData, // ✅ Giữ dữ liệu cũ khi đang tải trang mới
    staleTime: 1000 * 60 * 5, // 5 phút
  })
}
