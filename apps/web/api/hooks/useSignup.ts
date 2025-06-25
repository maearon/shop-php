import { useMutation } from "@tanstack/react-query"
import javaService from "../services/javaService"

export const useSignup = () => {
  return useMutation({
    mutationFn: (user: {
      name: string
      email: string
      password: string
      password_confirmation: string
    }) => javaService.test(),
  })
}
