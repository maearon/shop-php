// src/api/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import sessionApi from "@/api/sessionApi";
import { useRouter } from "next/navigation";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => sessionApi.destroy(),
    onSuccess: () => {
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout failed", error);
    }
  });
}
