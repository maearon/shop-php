import { useMutation } from "@tanstack/react-query"
import userApi from "@/api/endpoints/userApi"

export const useSignup = () => {
  return useMutation({
    mutationFn: (user: {
      name: string
      email: string
      password: string
      password_confirmation: string
    }) => userApi.create({ user }),
  })
}
