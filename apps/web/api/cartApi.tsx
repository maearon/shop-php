// import { ListParams, ListResponse, Student } from 'models';
import API from '.';
import { Micropost } from './micropostApi';
// import { Cart as CartCreate } from '@/store/sessionSlice';

export interface CartCreate {
  readonly id: string
  email: string
  name: string
  role: boolean
  avatar?: string
}

export interface ListParams {
  page?: number
  // guest_cart_id: string | null
  [key: string]: any
}

export interface ListResponse<CartItem> {
  cart_id: string
  guest_cart: boolean
  cart_items: CartItem[]
  meta: Meta 
}

export interface Meta {
  total_pages: number
  current_page: number
  total_count: number
}

export interface CartItem {
  id: number;
  quantity: number;
  cart_id: number;
  product: Product;
  variant: Variant;
  size: string;
  product_id: number;
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
  image?: string;
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

export interface CreateParams {
  cart: SignUpField
}

export interface SignUpField {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface CreateResponse<CartCreate> {
  cart?: CartCreate
  flash?: [message_type: string, message: string]
  status?: number
  message?: string
  errors: {
    [key: string]: string[]
  }
}

export interface CartShow {
  readonly id: string
  name: string
  gravatar_id: string
  size: number
  following: number
  followers: number
  current_cart_following_cart: boolean
}

export interface ShowResponse<CartShow> {
  cart: CartShow
  id_relationships?: number
  microposts: Micropost[]
  total_count: number
}

export interface CartEdit {
  name: string
  email: string
}

export interface EditResponse {
  cart: CartEdit
  gravatar: string
  flash?: [message_type: string, message: string]
}

export interface UpdateParams {
  cart: UpdateField
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

const cartApi = {
  index(params: ListParams): Promise<ListResponse<Cart>> {
    const url = '/cart';
    return API.get(url, { params });
  },

  create(params: CreateParams): Promise<CreateResponse<CartCreate>> {
    const url = '/carts';
    return API.post(url, params);
  },

  show(id: string, params: ListParams): Promise<ShowResponse<CartShow>> {
    const url = `/carts/${id}`;
    return API.get(url, { params });
  },

  edit(id: string): Promise<EditResponse> {
    const url = `/carts/${id}/edit`;
    return API.get(url);
  },

  update(id: string, params: UpdateParams): Promise<UpdateResponse> {
    const url = `/carts/${id}`;
    return API.patch(url, params);
  },

  destroy(id: string): Promise<Response> {
    const url = `/carts/${id}`;
    return API.delete(url);
  },

  follow(id: string, page: number, lastUrlSegment: string): Promise<FollowResponse<CartFollow,ICartFollow>> {
    const url = `/carts/${id}/${lastUrlSegment}`;
    return API.get(url, { params: { page } });
  },

  // following(id: string, page: number): Promise<FollowResponse<CartFollow,ICartFollow>> {
  //   const url = `/carts/${id}`;
  //   return API.delete(url);
  // },

  // followers(id: string, page: number): Promise<FollowResponse<CartFollow,ICartFollow>> {
  //   const url = `/carts/${id}`;
  //   return API.delete(url);
  // },
};

export default cartApi;

export interface CartFollow {
  readonly id: string
  name: string
  gravatar_id: string
  size: number
}

export interface FollowResponse<CartFollow,ICartFollow> {
  carts: CartFollow[]
  xcarts: CartFollow[]
  total_count: number
  cart: ICartFollow
}

export interface ICartFollow {
  readonly id: string
  name: string
  followers: number
  following: number
  gravatar: string
  micropost: number
}
