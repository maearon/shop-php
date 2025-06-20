// import { ListParams, ListResponse, Student } from 'models';
import API from '.';
import { Micropost } from './micropostApi';
// import { Product as ProductCreate } from '@/store/sessionSlice';

export interface ProductCreate {
  readonly id: string
  email: string
  name: string
  role: boolean
  avatar?: string
}

export interface ListParams {
  page?: number
  // guest_product_id: string | null
  [key: string]: any
}

export interface ListResponse<ProductItem> {
  product_id: string
  guest_product: boolean
  product_items: ProductItem[]
  meta: Meta 
}

export interface Meta {
  total_pages: number
  current_page: number
  total_count: number
}

export interface ProductItem {
  id: number;
  quantity: number;
  product_id: number;
  product: Product;
  variant: Variant;
  size: string;
  variant_id: number;
  created_at: string;  // ISO 8601 format
  updated_at: string;
}

export interface Product {
  id: number;
  name?: string;
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
  created_at: string; // ISO 8601 timestamp (e.g., "2025-06-18T12:00:00Z")
  updated_at: string;
}


export interface CreateParams {
  product: SignUpField
}

export interface SignUpField {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface CreateResponse<ProductCreate> {
  product?: ProductCreate
  flash?: [message_type: string, message: string]
  status?: number
  message?: string
  errors: {
    [key: string]: string[]
  }
}

export interface ProductDetails {
  id: number;
  name: string;
  jan_code: string;
  gender?: string;
  franchise?: string;
  productype?: string;
  brand?: string;
  category?: string;
  sport?: string;
  description_h5?: string;
  description_p?: string;
  specifications?: string;
  care?: string;
  variants: Variant[];
  created_at: string; // ISO 8601 timestamp (e.g., "2025-06-18T12:00:00Z")
  updated_at: string;
}

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
  created_at: string; // ISO timestamp
  updated_at: string;
}


export interface ProductEdit {
  name: string
  email: string
}

export interface EditResponse {
  product: ProductEdit
  gravatar: string
  flash?: [message_type: string, message: string]
}

export interface UpdateParams {
  product: UpdateField
}

export interface UpdateField {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface UpdateResponse {
  flash_success?: [message_type: string, message: string]
  error?: string[]
}

export interface Response {
  flash?: [message_type: string, message: string]
}

const productApi = {
  index(params: ListParams): Promise<ListResponse<Product>> {
    const url = '/product';
    return API.get(url, { params });
  },

  create(params: CreateParams): Promise<CreateResponse<ProductCreate>> {
    const url = '/products';
    return API.post(url, params);
  },

  show(id: string, params: ListParams): Promise<ProductDetails> {
    const url = `/products/${id}`;
    return API.get(url, { params });
  },

  edit(id: string): Promise<EditResponse> {
    const url = `/products/${id}/edit`;
    return API.get(url);
  },

  update(id: string, params: UpdateParams): Promise<UpdateResponse> {
    const url = `/products/${id}`;
    return API.patch(url, params);
  },

  destroy(id: string): Promise<Response> {
    const url = `/products/${id}`;
    return API.delete(url);
  },

  follow(id: string, page: number, lastUrlSegment: string): Promise<FollowResponse<ProductFollow,IProductFollow>> {
    const url = `/products/${id}/${lastUrlSegment}`;
    return API.get(url, { params: { page } });
  },

  // following(id: string, page: number): Promise<FollowResponse<ProductFollow,IProductFollow>> {
  //   const url = `/products/${id}`;
  //   return API.delete(url);
  // },

  // followers(id: string, page: number): Promise<FollowResponse<ProductFollow,IProductFollow>> {
  //   const url = `/products/${id}`;
  //   return API.delete(url);
  // },
};

export default productApi;

export interface ProductFollow {
  readonly id: string
  name: string
  gravatar_id: string
  size: number
}

export interface FollowResponse<ProductFollow,IProductFollow> {
  products: ProductFollow[]
  xproducts: ProductFollow[]
  total_count: number
  product: IProductFollow
}

export interface IProductFollow {
  readonly id: string
  name: string
  followers: number
  following: number
  gravatar: string
  micropost: number
}
