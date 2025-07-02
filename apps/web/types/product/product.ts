

// Product-related types

import { Optional } from "@/types/common";
import { Size, Variant } from "@/types/product";

// TODO: Add code here...

// 📁 @types/product.ts

/** 🛍 Product entity */
export interface Product {
  id: number
  jan_code: string
  title: string
  name: string
  description: string
  description_h5: string
  specifications: string
  care: string
  gender: string
  franchise: string
  producttype: string
  brand: string
  category: string
  sport: string
  currencyId: string
  currencyFormat: string
  isFreeShipping: boolean
  price: number
  original_price: number
  installments: number
  created_at: string
  updated_at: string
  image_url: string
  availableSizes: string[]
  variants: Variant[]
}

/** 📄 Product listing response */
export interface ProductsResponse {
  products: Product[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
    filters_applied: Record<string, any>;
    category_info: {
      title: string;
      breadcrumb: string;
      description: string;
    };
  };
}

/** 🧾 Product detail response */
export interface ProductDetails extends Product {
  // Extend if needed
}

/** 📝 Follow feature: product user follow data */
export interface ProductFollow {
  readonly id: string;
  name: string;
  gravatar_id: string;
  size: number;
}

export interface FollowResponse<ProductFollow, IProductFollow> {
  products: ProductFollow[];
  xproducts: ProductFollow[];
  total_count: number;
  product: IProductFollow;
}

export interface IProductFollow {
  readonly id: string;
  name: string;
  followers: number;
  following: number;
  gravatar: string;
  micropost: number;
}
