/** 🎨 Product variant */
export interface Variant {
  id: number
  color: string
  price: number
  original_price: number
  sku: string
  stock: number
  sizes: string[]
  product_id: number
  created_at: string
  updated_at: string
  images: string[]
  avatar_url: string
}

// 👟 Size type (used in Product Variant and CartItem)
export interface Size {
  id: number
  label: string
  system: string
  location: string
  created_at: string
  updated_at: string
}
