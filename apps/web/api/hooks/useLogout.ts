// apps/web/api/hooks/useLogout.ts
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { logout } from "@/store/sessionSlice"
import type { AppDispatch } from "@/store/store"
import { fetchUser } from "@/store/sessionSlice"
import { clearTokens } from "@/lib/token"
import javaService from "../services/javaService"

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(async () => {
    try {
      await javaService.logout()
      dispatch(logout())
      clearTokens()
      await dispatch(fetchUser()) // ✅ Redux fetch user sau logout
    } catch (error) {
      console.error("Logout failed", error)
    }
  }, [dispatch])
}
