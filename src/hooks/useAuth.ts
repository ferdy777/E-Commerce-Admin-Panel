import { useMutation } from "@tanstack/react-query";
import { loginService, type LoginPayload } from "../services/auth-service";
import type { LoginResponse } from "../types/auth";

export const useLogin = () => {
  return useMutation<LoginResponse, unknown, LoginPayload>({
    mutationFn: loginService,
  });
};
