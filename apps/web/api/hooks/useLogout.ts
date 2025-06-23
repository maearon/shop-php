// apps/web/api/hooks/useLogout.ts
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import sessionApi from "@/api/endpoints/sessionApi"
import { logout } from "@/store/sessionSlice"
import type { AppDispatch } from "@/store/store"

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(async () => {
    try {
      await sessionApi.destroy()
      dispatch(logout())
    } catch (error) {
      console.error("Logout failed", error)
    }
  }, [dispatch])
}
