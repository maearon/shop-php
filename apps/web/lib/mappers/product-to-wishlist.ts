// 📁 @/lib/mappers/product-to-wishlist.ts

import type { WishlistItem } from "@/types/wish"

interface PartialProductForWishlist {
  id: number
  name: string
  price: string
  image?: string
  image_url?: string
  category?: string
  url?: string
}

export function mapProductToWishlistItem(product: PartialProductForWishlist): WishlistItem {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image || product.image_url || "/placeholder.png",
    category: product.category,
    url: product.url,
  }
}
