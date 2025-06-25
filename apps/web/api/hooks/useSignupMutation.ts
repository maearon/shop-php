"use client";
import { useMutation } from "@tanstack/react-query";
import javaService from "../services/javaService";

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (data: any) => javaService.test(),
  });
};
