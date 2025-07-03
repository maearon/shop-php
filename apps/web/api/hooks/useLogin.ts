import { useMutation } from "@tanstack/react-query"
import javaService from "@/api/services/javaService"

export const useLogin = () =>
  useMutation({
    mutationKey: ['LoginByModal'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      javaService.login({ session: { email, password } }),
  })
