import API from ".";

export interface CreateParams {
  FollowedId: string | string[] | undefined
}

export interface CreateResponse {
  // follow: boolean
  message: string
}

export type DestroyResponse = string

const relationshipApi = {
  create(params: CreateParams): Promise<CreateResponse> {
    const url = '/relationships';
    return API.post(url, params);
  },

  destroy(id: string): Promise<DestroyResponse> {
    const url = `/relationships/${id}`;
    return API.delete(url);
  },
};

export default relationshipApi;
