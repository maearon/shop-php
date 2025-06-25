import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { fetchUser } from "@/store/sessionSlice"
import type { AppDispatch } from "@/store/store"
import { setTokens } from "@/lib/token" // ✅ Dùng hàm có sẵn
import javaService from "@/api/services/javaService"

interface LoginPayload {
  email: string
  password: string
  rememberMe?: boolean
}

export const useLoginMutation = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useMutation({
    mutationFn: async ({ email, password, rememberMe = true }: LoginPayload) => {
      const response = await javaService.login({
        session: { email, password },
      })

      const { access, refresh } = response.tokens
      setTokens(access.token, refresh.token, rememberMe) // ✅ Sử dụng hàm chuẩn

      return response
    },
    onSuccess: async () => {
      await dispatch(fetchUser()) // ✅ Redux fetch user sau login
    },
  })
}
