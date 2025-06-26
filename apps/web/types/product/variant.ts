/** 🎨 Product variant */
export interface Variant {
  id: number;
  color?: string;
  price?: number;
  originalprice?: number;
  sku?: string;
  stock?: number;
  size: string[];
  images: string[];
  product_id: number;
  created_at: string;
  updated_at: string;
}

// 👟 Size type (used in Product Variant and CartItem)
export interface Size {
  id: number
  label: string
  system: string
  available: boolean
}