import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3000/api'
} else {
  BASE_URL = 'https://spring-boilerplate.onrender.com/api'
}

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';

axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-lang': 'EN'
  },
});

API.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    if (
      localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined'
    ) 
    {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    else if (
      sessionStorage.getItem('token') && sessionStorage.getItem('token') !== 'undefined'
    ) 
    {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// ✅ Token Refresh Mechanism
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

// ✅ Response Interceptor
API.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // Retry only once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(axios(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${BASE_URL}/refresh`, {
          refresh_token: refreshToken,
        });

        const newToken = res.data.token;
        const newRefresh = res.data.refresh_token;
        const rememberMe = !!localStorage.getItem('token'); // true if using localStorage

        saveTokens(newToken, newRefresh, rememberMe);
        API.defaults.headers['Authorization'] = `Bearer ${newToken}`;
        processQueue(null, newToken);

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;
