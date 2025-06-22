// 📦 apps/web/api/authApi.ts
import API from "."
import { SessionResponse } from "./sessionApi";

const authApi = {
  oauth: (payload: { id_token: string; provider: string }): Promise<SessionResponse> =>
    API.post("/oauth", payload)
}

export default authApi
