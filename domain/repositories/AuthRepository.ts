import { UserCredential } from "firebase/auth";

export interface AuthRepository {
  signInUser(
    email: string,
    password: string
  ): Promise<{ userCredential: UserCredential }>;
  signUpUser(
    email: string,
    password: string,
    userName: string
  ): Promise<{ success: boolean }>;
  logoutUser(): Promise<{ success: boolean }>;
}
