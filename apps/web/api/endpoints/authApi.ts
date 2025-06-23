// 📦 apps/web/api/authApi.ts
import api from "@/api/client";
import { SessionResponse } from "./sessionApi";

const authApi = {
  oauth: (payload: { id_token: string; provider: string }): Promise<SessionResponse> =>
    api.post("/oauth", payload)
}

export default authApi
