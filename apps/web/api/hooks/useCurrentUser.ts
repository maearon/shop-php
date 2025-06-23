// apps/web/api/hooks/useCurrentUser.ts
import { useQuery } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { fetchUser } from "@/store/sessionSlice"
import type { AppDispatch } from "@/store/store"

export const useCurrentUser = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const user = await dispatch(fetchUser()).unwrap()
      return user
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}
