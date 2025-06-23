// src/api/useCurrentUser.ts
import { useQuery } from "@tanstack/react-query";
import sessionApi from "@/api/sessionApi";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => sessionApi.index(),
    staleTime: 5 * 60 * 1000, // cache 5 phút
    retry: 1
  });
}
