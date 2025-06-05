// import { ListParams, ListResponse, Student } from 'models';
import API from '.';
import { User } from '../stores/session';

export interface SessionParams {
  session: LoginField
}

export interface LoginField {
  email: string
  password: string
  remember_me: string
}

export interface Response<User> {
  type: string
  currentAuthority: string
  user?: User
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
  flash?: [message_type: string, message: string]
  error?: string[]
  status?: number
  message?: string
  errors: {
    [key: string]: string[]
  }
}

const sessionApi = {
  create(params: SessionParams): Promise<Response<User>> {
    const url = '/auth/login';
    return API.post(url, params);
  },

  destroy(): Promise<any> {
    const url = '/Auth/logout';
    return API.delete(url);
  },
};

export default sessionApi;
