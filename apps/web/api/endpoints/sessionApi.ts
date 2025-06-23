import api from "@/api/client"
import { User } from "@/store/sessionSlice"

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginParams {
  session: LoginCredentials
}

export interface TokenPair {
  token: string
  expires: string
}

export interface SessionResponse {
  user: User
  tokens: {
    access: TokenPair
    refresh: TokenPair
  }
}

export interface SessionIndexResponse {
  user: User
}

const sessionApi = {
  me(): Promise<SessionIndexResponse> {
    return api.get("/sessions")
  },

  create(params: LoginParams): Promise<SessionResponse> {
    return api.post("/login", params)
  },

  destroy(): Promise<void> {
    return api.delete("/logout")
  },
}

export default sessionApi
