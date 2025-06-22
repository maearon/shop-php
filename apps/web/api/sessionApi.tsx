// apps/web/api/sessionApi.ts
import API from "."
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
  index(): Promise<SessionIndexResponse> {
    return API.get("/sessions")
  },

  create(params: LoginParams): Promise<SessionResponse> {
    return API.post("/login", params)
  },

  destroy(): Promise<void> {
    return API.delete("/logout")
  },
}

export default sessionApi
