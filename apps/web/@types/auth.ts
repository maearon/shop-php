// 🔐 Types for Password Reset feature

export interface PasswordResetCreateParams {
  password_reset: {
    email: string
  }
}

export interface PasswordResetCreateResponse {
  flash: [message_type: string, message: string]
}

export interface PasswordResetUpdateParams {
  email: string
  user: {
    password: string
    password_confirmation: string
  }
}

export interface PasswordResetUpdateResponse {
  user_id?: string
  flash?: [message_type: string, message: string]
  error?: string[]
}


// Auth-related types

// TODO: Add code here...

// ✅ Auth-related shared types for Java backend

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

export interface AuthResponse {
  user: User
  token: string
  refresh_token: string
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

export interface User {
  id: number
  email: string
  name: string
  avatar?: string
}
