import axios, { type AxiosResponse } from "axios"

let BASE_URL = ""
if (process.env.NODE_ENV === "development") {
  BASE_URL = "https://dotnetboilerplate.onrender.com/api"
} else {
  BASE_URL = "https://dotnetboilerplate.onrender.com/api"
}

axios.defaults.xsrfCookieName = "CSRF-TOKEN"

axios.defaults.xsrfHeaderName = "X-CSRF-Token"

axios.defaults.withCredentials = true

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-lang": "EN",
  },
})

API.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")
    const rememberToken = localStorage.getItem("remember_token") || sessionStorage.getItem("remember_token")

    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

API.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    // For 401 errors when accessing /Session/me endpoint, don't reject the promise
    // This prevents the error from propagating when checking auth status
    if (error.response && error.response.status === 401 && error.config.url.includes("/Session/me")) {
      console.log("Handling 401 error silently for auth check")
      // Return an empty successful response instead of rejecting
      return Promise.resolve({ user: null, loggedIn: false })
    }
    return Promise.reject(error)
  },
)

export default API
