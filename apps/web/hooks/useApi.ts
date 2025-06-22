"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import authApi from "@/api/authApi"
import { setToken } from "@/lib/token"
import { fetchUser } from "@/store/sessionSlice"
import type { AppDispatch } from "@/store/store"

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const loginWithGoogle = useCallback(async (idToken: string) => {
    try {
      const res = await authApi.oauthLogin({
        id_token: idToken,
        provider: "google",
      })

      if (res?.tokens?.access?.token) {
        setToken(res.tokens)
        await dispatch(fetchUser())
        router.push("/")
      }
    } catch (err) {
      console.error("OAuth login error:", err)
    }
  }, [dispatch, router])

  return { loginWithGoogle }
}

export default useAuth
