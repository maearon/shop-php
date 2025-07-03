// Java Service API (auth, session, user, password reset)

// TODO: Add code here...
// 📦 Java Service (Spring Boot)
// Handles: Auth, Session, User, Password Reset APIs

import api from "@/api/client"
import { UserCreateParams, UserCreateResponse } from "@/types/user"
import { 
  SessionResponse, SessionIndexResponse, LoginParams, 
  ResendActivationEmailResponse, ResendActivationEmailParams, 
  User, PasswordResetCreateResponse, 
  SendForgotPasswordEmailParams,
  PasswordResetUpdateParams,
  PasswordResetUpdateResponse
} from "@/types/auth"
import { ApiResponse } from "@/types/common"

const javaService = {
  // Password Reset
  sendForgotPasswordEmail(params: SendForgotPasswordEmailParams): Promise<PasswordResetCreateResponse> {
    const url = '/password-resets';
    return api.post(url, params);
  },
  resetForForgotPassword(reset_token: string, params: PasswordResetUpdateParams): Promise<PasswordResetUpdateResponse> {
    const url = `/password-resets/${reset_token}`;
    return api.patch(url, params);
  },

  // Resend and Activate
  resendActivationEmail(params: ResendActivationEmailParams): Promise<ResendActivationEmailResponse> {
    const url = `/account_activations`;
    return api.post(url, params);
  },

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
