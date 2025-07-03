// Java Service API (auth, session, user, password reset)

// TODO: Add code here...
// 📦 Java Service (Spring Boot)
// Handles: Auth, Session, User, Password Reset APIs

import api from "@/api/client"
import { UserCreateParams, UserCreateResponse } from "@/types/user"
import { SessionResponse, SessionIndexResponse, LoginParams } from "@/types/auth/auth"
import { ApiResponse } from "@/types/common"
// ------------------- Products -------------------
import { Product, ProductFilters, ProductsResponse } from "@/types/product"
import { CartItem } from "@/types/cart"
import { WishItem } from "@/types/wish"

const javaService = {
  checkEmail: (email: string): Promise<{ exists: boolean }> =>
    api.post("/check_email", { email }),
  
  login: (params: LoginParams): Promise<SessionResponse> =>
    api.post("/login", params),

  register: (params: UserCreateParams): Promise<UserCreateResponse> =>
    api.post("/signup", params),

  logout: (): Promise<void> => api.delete("/logout"),

  // 👤 Session
  getCurrentSession: (): Promise<SessionIndexResponse> =>
    api.get("/sessions"),

  // Ìninity
  test: (): Promise<any> => api.get("/"),

  // test products
  fetchProducts: async (): Promise<ApiResponse<Product[]>> => {
    return api.get("/products");
  },

  // Wish List (Pagination optional)
  getWish: async (page: number = 1): Promise<ApiResponse<WishItem[]>> =>
    api.get(`/wish?page=${page}`),

  // Cart List (Pagination optional)
  getCart: async (page: number = 1): Promise<ApiResponse<CartItem[]>> =>
    api.get(`/cart?page=${page}`),

  // ------------------- Products -------------------
  getProductFilters: async () => api.get("/products/filters"),

  getProducts: async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString())
      }
    })
    return api.get(`/products${params.toString() ? `?${params.toString()}` : ""}`)
  },

  getProduct: async (id: number | string, params?: any) => api.get(`/products/${id}`, { params })
  }

export default javaService
