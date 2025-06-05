// import { ListParams, ListResponse, Student } from 'models';
import API from '.';
import { ErrorMessageType } from '../utils/errorMessages';

export interface ListParams {
  page?: number
  [key: string]: any
}

export interface ListResponse<Micropost> {
  feed_items: Micropost[]
  followers: number
  following: number
  gravatar: string
  micropost: number
  total_count: number
}

export interface Micropost {
  readonly id: number
  content: string
  gravatar_id?: string
  image: string
  size: number
  timestamp: string
  readonly user_id: string
  user_name?: string
  title?: string
  description?: string
  videoId?: string
  channelTitle?: string
  user: UserMicropost
}

export interface UserMicropost {
  readonly id: string
  name: string
  email: string
  gravatar: string
}

export interface CreateParams {
  user: SignUpField
}

export interface SignUpField {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface CreateResponse {
  flash?: [message_type: string, message: string]
  error?: ErrorMessageType
  content: string
}

export type Response = string

const micropostApi = {
  getAll(params: ListParams): Promise<ListResponse<Micropost>> {
    const url = '';
    return API.get(url, { params });
  },

  create(params: FormData): Promise<CreateResponse> {
  // create(params: CreateParams): Promise<CreateResponse>
  // create(params: any): Promise<CreateResponse> {
    const url = '/microposts';
    return API.post(url, params, { headers: { 'Content-Type': 'multipart/form-data' } });
  },

  remove(id: number): Promise<Response> {
    const url = `/microposts/${id}`;
    return API.delete(url);
  },

  likeOrDislikeYoutubeVideo(videoId: string, rating: string): Promise<Response> {
    const url = `https://www.googleapis.com/youtube/v3/videos/rate?id=${videoId}&rating=${rating}`;
    return API.post(url);
  },
};

export default micropostApi;
