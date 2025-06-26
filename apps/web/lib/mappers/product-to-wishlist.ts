// 🔧 /lib/mappers/product-to-wishlist.ts
import { ProductData } from "@/types/product";
import { WishlistItem } from "@/types/wish";

export function mapProductToWishItem(product: ProductData): WishlistItem {
  return {
    id: Number(product.id),
    name: product.name,
    price: String(product.pricing_information.currentPrice),
    image: product.image_url,
    category: product.attribute_list?.brand,
  };
}
