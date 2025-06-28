

// Product-related types

import { Optional } from "../common";
import { Variant } from "./variant";

// TODO: Add code here...

// 📁 @types/product.ts

/** 🛍 Product entity */
export interface Product {
  id: number;
  name: string;
  price?: string;
  attribute_list?: {
    brand?: string;
    color?: string;
    gender?: string;
    sale?: boolean;
    // mở rộng tùy vào project
  }; 
  image?: Optional<string>;
  model_number?: string;
  base_model_number?: string
  product_type?: string;
  url?: string;

  display_name?: string;
  price_information?: any[];
  pricing_information?: {
    currentPrice: number;
    standard_price: number;
    standard_price_no_vat: number;
  };
  thumbnail?: string;
  jan_code?: string;
  gender?: string;
  franchise?: string;
  producttype?: string;
  brand?: string;
  category?: string;
  sport?: string;
  description_h5?: string;
  description_p?: string;
  specifications?: string;
  care?: string;
  created_at: string; // ISO 8601 timestamp
  updated_at: string;
  description: string;
  image_url: string;
  variants?: Variant[];
  slug?: string;
  score?: number;
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
