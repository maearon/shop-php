// Java Service API (auth, session, user, password reset)

// TODO: Add code here...
// 📦 Java Service (Spring Boot)
// Handles: Auth, Session, User, Password Reset APIs

import api from "@/api/client"
import { SessionResponse, SessionIndexResponse, LoginParams } from "@/@types/auth"

const javaService = {
  login: (params: LoginParams): Promise<SessionResponse> =>
    api.post("/login", params),

  logout: (): Promise<void> => api.delete("/logout"),

  // 👤 Session
  getCurrentSession: (): Promise<SessionIndexResponse> =>
    api.get("/sessions"),

  // Ìninity
  test: (): Promise<any> => api.get("/"),
}

export default javaService
