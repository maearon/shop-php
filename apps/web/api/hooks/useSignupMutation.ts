"use client";
import { useMutation } from "@tanstack/react-query";
import userApi from "@/api/endpoints/userApi";

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (data: any) => userApi.create({ user: data }),
  });
};
