import api from "@/api/client"
import { clearTokens, getRefreshToken, setTokens } from "@/lib/token"

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
class paymentApi {
  // Auth APIs (Java Spring Boot - port 8080)
  async login(email: string, password: string, rememberMe = false): Promise<AuthResponse> {
    const response = await api.post("/login", {
      email,
      password,
      remember_me: rememberMe,
    })

    if (response.data.token) {
      setTokens(response.data.token, response.data.refresh_token, rememberMe)
    }

    return response.data
  }

  async register(userData: {
    email: string
    password: string
    name: string
    confirm_password: string
  }): Promise<AuthResponse> {
    const response = await api.post("/register", userData)

    if (response.data.token) {
      setTokens(response.data.token, response.data.refresh_token, false)
    }

    return response.data
  }

  async logout(): Promise<void> {
    try {
      await api.post("/logout")
    } finally {
      clearTokens()
    }
  }

  async getCurrentUser(): Promise<User> {
    return api.get("/sessions")
  }

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    const response = await api.post("/refresh", {
      refresh_token: refreshToken,
    })

    if (response.data.token) {
      const rememberMe = !!localStorage.getItem("token")
      setTokens(response.data.token, response.data.refresh_token, rememberMe)
    }

    return response.data
  }

  // Search APIs (Django Python - search service via Rails proxy)
  async searchProducts(filters: SearchFilters = {}): Promise<SearchResponse> {
    return api.post("/search/products", filters)
  }

  async getSearchSuggestions(query: string): Promise<{ suggestions: string[] }> {
    return api.get(`/search/suggestions?q=${encodeURIComponent(query)}`)
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

    return api.get(endpoint)
  }

  async getProduct(id: number): Promise<{ product: Product; related_products: Product[] }> {
    return api.get(`/products/${id}`)
  }

  async getProductFilters(): Promise<{
    genders: string[]
    categories: string[]
    sports: string[]
    brands: string[]
    sizes: string[]
    price_ranges: Array<{ label: string; min: number; max: number | null }>
  }> {
    return api.get("/products/filters")
  }

  // Cart APIs (Ruby Rails - port 3000)
  async getCartItems(): Promise<CartItem[]> {
    return api.get("/cart_items")
  }

  async addToCart(productId: number, variantId: number, sizeId: number, quantity = 1): Promise<CartItem> {
    return api.post("/cart_items", {
      cart_item: {
        product_id: productId,
        variant_id: variantId,
        size_id: sizeId,
        quantity,
      },
    })
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem> {
    return api.put(`/cart_items/${id}`, {
      cart_item: { quantity },
    })
  }

  async removeFromCart(id: number): Promise<void> {
    return api.delete(`/cart_items/${id}`)
  }

  async clearCart(): Promise<void> {
    return api.delete("/cart_items")
  }

  // Wishlist APIs (Ruby Rails - port 3000)
  async getWishItems(): Promise<WishItem[]> {
    return api.get("/wish_items")
  }

  async addToWishlist(productId: number): Promise<WishItem> {
    return api.post("/wish_items", {
      wish_item: {
        product_id: productId,
      },
    })
  }

  async removeFromWishlist(id: number): Promise<void> {
    return api.delete(`/wish_items/${id}`)
  }

  async moveToCart(wishItemId: number, variantId: number, sizeId: number): Promise<CartItem> {
    return api.post(`/wish_items/${wishItemId}/move_to_cart`, {
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
    return api.post("/orders", { order: orderData })
  }

  async getOrders(): Promise<any[]> {
    return api.get("/orders")
  }

  async getOrder(id: number): Promise<any> {
    return api.get(`/orders/${id}`)
  }

  // Payment APIs (Go Gin - payments service)
  async createPaymentIntent(amount: number, currency = "USD"): Promise<any> {
    return api.post("/payments/intent", {
      amount,
      currency,
    })
  }

  async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<any> {
    return api.post("/payments/confirm", {
      payment_intent_id: paymentIntentId,
      payment_method_id: paymentMethodId,
    })
  }
}

// Export singleton instance
export const paymentApiClient = new paymentApi()
