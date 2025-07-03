import { useMutation } from "@tanstack/react-query"
import javaService from "@/api/services/javaService"
import { RegisterInput } from "@/types/user";

export const useRegister = () =>
  useMutation({
    mutationKey: ['Register'],
    mutationFn: async ({ email, password }: RegisterInput) => {
      const payload = {
        user: {
          email,
          password,
          password_confirmation: password,
          name: email.split("@")[0],
        },
      };

      return javaService.register(payload);
    },
  });