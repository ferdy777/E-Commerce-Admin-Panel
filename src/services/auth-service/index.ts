import AxiosConfig from "@/config/api";
import type { LoginPayload, LoginResponse } from "../../types/auth";

export const loginService = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  return AxiosConfig.post("/auth/login", payload).then((res) => res.data);
};

export type { LoginPayload, LoginResponse };
