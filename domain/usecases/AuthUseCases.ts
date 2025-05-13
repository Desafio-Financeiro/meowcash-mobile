import { authApi } from "@/infrastructure/api/AuthApi";

export const signInUser = async (email: string, password: string) => {
  return await authApi.signInUser(email, password);
};

export const signUpUser = async (
  email: string,
  password: string,
  userName: string
) => {
  return await authApi.signUpUser(email, password, userName);
};

export const logoutUser = async () => {
  return await authApi.logoutUser();
};
