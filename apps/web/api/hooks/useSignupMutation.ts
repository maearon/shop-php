"use client";
import { useMutation } from "@tanstack/react-query";
import javaService from "../services/javaService";
import { UserCreateParams } from "@/types/user";

export const useSignupMutation = () => {
  return useMutation({
    mutationKey: ['Signup'],
    mutationFn: (data: UserCreateParams) => javaService.createUser(data),
  });
};
