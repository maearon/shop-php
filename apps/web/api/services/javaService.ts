// Java Service API (auth, session, user, password reset)

// TODO: Add code here...
// 📦 Java Service (Spring Boot)
// Handles: Auth, Session, User, Password Reset APIs

import api from "@/api/client"
import { SessionResponse, SessionIndexResponse, LoginParams } from "@/types/auth/auth"
import { ApiResponse } from "@/types/common"
// ------------------- Products -------------------
import { Product, ProductFilters, ProductsResponse } from "@/types/product"

const javaService = {
  login: (params: LoginParams): Promise<SessionResponse> =>
    api.post("/login", params),

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
