// import { ListParams, ListResponse, Student } from 'models';
import API from '.';
import { User } from '@/store/sessionSlice';

export interface SessionParams {
  session: LoginField
}

export interface LoginField {
  email: string
  password: string
  // remember_me: string; // "1" or "0"
}

export interface Response<User> {
  user: User
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
}

export interface IndexResponse {
  user: User;
}

const sessionApi = {
  index(): Promise<IndexResponse> {
    const url = '/sessions';
    return API.get(url);
  },

  create(params: SessionParams): Promise<Response<User>> {
    const url = '/login';
    return API.post(url, params);
  },

  destroy(): Promise<any> {
    const url = '/logout';
    return API.delete(url);
  },
};

export default sessionApi;
