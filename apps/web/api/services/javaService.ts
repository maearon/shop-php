// Java Service API (auth, session, user, password reset)

// TODO: Add code here...
// 📦 Java Service (Spring Boot)
// Handles: Auth, Session, User, Password Reset APIs

import api from "@/api/client"
import { UserCreateParams, UserCreateResponse } from "@/types/user"
import { 
  SessionResponse, SessionIndexResponse, LoginParams, 
  User
} from "@/types/auth"
import { ApiResponse } from "@/types/common"

const javaService = {
  activateAccount(activation_token: string, email: string): Promise<ApiResponse<User>> {
    const url = `/account_activations/${activation_token}`;
    return api.patch(url, {email: email});
  },
  // Auth

  checkEmail: (email: string): Promise<{ exists: boolean, user: { activated: boolean } }> =>
    api.post("/check-email", { email }),
  
  login: (params: LoginParams): Promise<SessionResponse> =>
    api.post("/login", params),

  register: (params: UserCreateParams): Promise<UserCreateResponse> =>
    api.post("/signup", params),

  logout: (): Promise<void> => api.delete("/logout"),

  // 👤 Session
  getCurrentSession: (): Promise<SessionIndexResponse> =>
    api.get("/sessions"),

  // Ininity
  test: (): Promise<any> => api.get("/"),
  }

export default javaService
