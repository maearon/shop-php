import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios"

// Base URL - Always use API Gateway
const BASE_URL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:9000/api"

// Configure axios defaults
axios.defaults.xsrfCookieName = "CSRF-TOKEN"
axios.defaults.xsrfHeaderName = "X-CSRF-Token"
axios.defaults.withCredentials = true

// Create API instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-lang": "EN",
  },
})

// Token management utilities
const getToken = (): string | null => {
  if (typeof window === "undefined") return null

  const token =
    localStorage.getItem("token") !== "undefined" ? localStorage.getItem("token") : sessionStorage.getItem("token")

  return token
}

const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null

  const refreshToken =
    localStorage.getItem("refresh_token") !== "undefined"
      ? localStorage.getItem("refresh_token")
      : sessionStorage.getItem("refresh_token")

  return refreshToken
}

const saveTokens = (token: string, refreshToken: string, rememberMe = false): void => {
  if (typeof window === "undefined") return

  const storage = rememberMe ? localStorage : sessionStorage
  storage.setItem("token", token)
  storage.setItem("refresh_token", refreshToken)
}

const clearTokens = (): void => {
  if (typeof window === "undefined") return

  localStorage.removeItem("token")
  localStorage.removeItem("refresh_token")
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("refresh_token")
  localStorage.removeItem("guest_cart_id")
  sessionStorage.removeItem("guest_cart_id")
}

// Request interceptor
API.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    // Auto add guest_cart_id to query if available
    if (typeof window !== "undefined") {
      const guestCartId =
        localStorage.getItem("guest_cart_id") !== "undefined"
          ? localStorage.getItem("guest_cart_id")
          : sessionStorage.getItem("guest_cart_id")

      if (guestCartId && config.url) {
        const url = new URL(config.url, BASE_URL)
        if (!url.searchParams.has("guest_cart_id")) {
          url.searchParams.set("guest_cart_id", guestCartId)
          config.url = url.pathname + url.search
        }
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Token refresh mechanism
let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token!)
  })
  failedQueue = []
}

// Response interceptor
API.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error) => {
    const originalRequest = error.config

    // Handle 401 errors with token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`
              resolve(axios(originalRequest))
            },
            reject,
          })
        })
      }

      isRefreshing = true
      const refreshToken = getRefreshToken()

      if (!refreshToken) {
        clearTokens()
        if (typeof window !== "undefined") {
          window.location.href = "/account-login"
        }
        return Promise.reject(error)
      }

      try {
        const res = await axios.post(`${BASE_URL}/refresh`, {
          refresh_token: refreshToken,
        })

        const newToken = res.data.token
        const newRefresh = res.data.refresh_token
        if (typeof window !== "undefined") {
        const rememberMe = !!localStorage.getItem("token")
        }

        saveTokens(newToken, newRefresh, rememberMe)
        API.defaults.headers["Authorization"] = `Bearer ${newToken}`
        processQueue(null, newToken)

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`
        return axios(originalRequest)
      } catch (err) {
        processQueue(err, null)
        clearTokens()
        if (typeof window !== "undefined") {
          window.location.href = "/account-login"
        }
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

// TypeScript interfaces
export interface Product {
  id: number
  name: string
  price: number
  brand: string
  category: string
  gender: string
  sport: string
  jan_code: string
  description: string
  image_url: string
  variants: Variant[]
  slug: string
  score?: number
  image?: string
}

export interface Variant {
  id: number
  color: string
  sizes: Size[]
}

export interface Size {
  id: number
  label: string
  system: string
  available: boolean
}

export interface ProductsResponse {
  products: Product[]
  meta: {
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

export interface ProductFilters {
  slug?: string
  q?: string
  gender?: string
  category?: string
  sport?: string
  brand?: string
  min_price?: number
  max_price?: number
  size?: string
  color?: string
  page?: number
  per_page?: number
}

export interface User {
  id: number
  email: string
  name: string
  avatar?: string
}

export interface AuthResponse {
  user: User
  token: string
  refresh_token: string
}

export interface CartItem {
  id: number
  product: Product
  variant: Variant
  size: Size
  quantity: number
  price: number
}

export interface WishItem {
  id: number
  product: Product
}

// API Client Class
class ApiClient {
  // Auth APIs (Java Spring Boot - port 8080)
  async login(email: string, password: string, rememberMe = false): Promise<AuthResponse> {
    const response = await API.post("/login", {
      email,
      password,
      remember_me: rememberMe,
    })

    if (response.token) {
      saveTokens(response.token, response.refresh_token, rememberMe)
    }

    return response
  }

  async register(userData: {
    email: string
    password: string
    name: string
    confirm_password: string
  }): Promise<AuthResponse> {
    const response = await API.post("/register", userData)

    if (response.token) {
      saveTokens(response.token, response.refresh_token, false)
    }

    return response
  }

  async logout(): Promise<void> {
    try {
      await API.post("/logout")
    } finally {
      clearTokens()
    }
  }

  async getCurrentUser(): Promise<User> {
    return API.get("/sessions")
  }

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    const response = await API.post("/refresh", {
      refresh_token: refreshToken,
    })

    if (response.token) {
      if (typeof window !== "undefined") {
      const rememberMe = !!localStorage.getItem("token")
      }
      saveTokens(response.token, response.refresh_token, rememberMe)
    }

    return response
  }

  // Search APIs (Django Python - search service via Rails proxy)
  async searchProducts(filters: SearchFilters = {}): Promise<SearchResponse> {
    return API.post("/search/products", filters)
  }

  async getSearchSuggestions(query: string): Promise<{ suggestions: string[] }> {
    return API.get(`/search/suggestions?q=${encodeURIComponent(query)}`)
  }

  // Products APIs (Ruby Rails - port 3000)
  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString())
      }
    })

    const queryString = params.toString()
    const endpoint = `/products${queryString ? `?${queryString}` : ""}`

    return API.get(endpoint)
  }

  async getProduct(id: number): Promise<{ product: Product; related_products: Product[] }> {
    return API.get(`/products/${id}`)
  }

  async getProductFilters(): Promise<{
    genders: string[]
    categories: string[]
    sports: string[]
    brands: string[]
    sizes: string[]
    price_ranges: Array<{ label: string; min: number; max: number | null }>
  }> {
    return API.get("/products/filters")
  }

  // Cart APIs (Ruby Rails - port 3000)
  async getCartItems(): Promise<CartItem[]> {
    return API.get("/cart_items")
  }

  async addToCart(productId: number, variantId: number, sizeId: number, quantity = 1): Promise<CartItem> {
    return API.post("/cart_items", {
      cart_item: {
        product_id: productId,
        variant_id: variantId,
        size_id: sizeId,
        quantity,
      },
    })
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem> {
    return API.put(`/cart_items/${id}`, {
      cart_item: { quantity },
    })
  }

  async removeFromCart(id: number): Promise<void> {
    return API.delete(`/cart_items/${id}`)
  }

  async clearCart(): Promise<void> {
    return API.delete("/cart_items")
  }

  // Wishlist APIs (Ruby Rails - port 3000)
  async getWishItems(): Promise<WishItem[]> {
    return API.get("/wish_items")
  }

  async addToWishlist(productId: number): Promise<WishItem> {
    return API.post("/wish_items", {
      wish_item: {
        product_id: productId,
      },
    })
  }

  async removeFromWishlist(id: number): Promise<void> {
    return API.delete(`/wish_items/${id}`)
  }

  async moveToCart(wishItemId: number, variantId: number, sizeId: number): Promise<CartItem> {
    return API.post(`/wish_items/${wishItemId}/move_to_cart`, {
      variant_id: variantId,
      size_id: sizeId,
    })
  }

  // Orders APIs (Ruby Rails - port 3000)
  async createOrder(orderData: {
    shipping_address: any
    billing_address: any
    payment_method: string
  }): Promise<any> {
    return API.post("/orders", { order: orderData })
  }

  async getOrders(): Promise<any[]> {
    return API.get("/orders")
  }

  async getOrder(id: number): Promise<any> {
    return API.get(`/orders/${id}`)
  }

  // Search APIs (Python Django - search service)
  // async searchProducts(query: string, filters: any = {}): Promise<ProductsResponse> {
  //   return API.get("/search/products", {
  //     params: { q: query, ...filters },
  //   })
  // }

  // Payment APIs (Go Gin - payments service)
  async createPaymentIntent(amount: number, currency = "USD"): Promise<any> {
    return API.post("/payments/intent", {
      amount,
      currency,
    })
  }

  async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<any> {
    return API.post("/payments/confirm", {
      payment_intent_id: paymentIntentId,
      payment_method_id: paymentMethodId,
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Export utilities
export { getToken, getRefreshToken, saveTokens, clearTokens }

// Export axios instance for direct use if needed
export default API
