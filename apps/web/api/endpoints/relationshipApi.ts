import api from '@/api/client';

export interface CreateParams {
  followed_id: string | string[] | undefined
}

export interface CreateResponse {
  follow: boolean
}

export interface DestroyResponse {
  unfollow: boolean
}

const relationshipApi = {
  create(params: CreateParams): Promise<CreateResponse> {
    const url = '/relationships';
    return api.post(url, params);
  },

  destroy(id: string): Promise<DestroyResponse> {
    const url = `/relationships/${id}`;
    return api.delete(url);
  },
};

export default relationshipApi;
